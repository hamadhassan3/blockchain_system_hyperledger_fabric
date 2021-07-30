package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
	"github.com/hyperledger/fabric/common/flogging"


	"github.com/hyperledger/fabric-chaincode-go/pkg/cid"
)

var logger = flogging.MustGetLogger("measurements")

// SmartContract Define the Smart Contract structure
type SmartContract struct {
}

//The measurement structure represents the measurement inputted by the field staff
type Measurement struct {
	WellID             string `json:"wellID"`
	TotalDisposition           string `json:"totalDisposition"`
	ClosingInventory  string `json:"closingInventory"`
	OpeningInventory     string `json:"openingInventory"`
	Receipts string `json:"receipts"`
	Temperature string `json:"temperature"`
	Viscosity string `json:"viscosity"`
	Username string `json:"username"`
	Approved string `json:"approved"`
	OilOrGas string `json:"oilorgas"`
	Reason string `json:"reason"`

	
}

//The Init method initializes the smart contract
func (s *SmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

//The Invoke method helps invoke the appropriate method
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()
	logger.Infof("Function name is:  %d", function)
	logger.Infof("Args length is : %d", len(args))

	switch function {
	case "addNewMeasurement":
		return s.addNewMeasurement(APIstub, args)
	case "queryMeasurementByID":
		return s.queryMeasurementByID(APIstub, args)
	case "getMeasurementByPersonID":
		return s.getMeasurementByPersonID(APIstub, args)
	case "queryAllMeasurements":
		return s.queryAllMeasurements(APIstub)
	case "updateData":
		return s.updateData(APIstub, args)
	case "getHistoryForAsset":
		return s.getHistoryForAsset(APIstub, args)
	case "approveMeasurement":
		return s.approveMeasurement(APIstub, args)

	default:
		return shim.Error("Invalid Smart Contract function name.")
	}

}

//This method gets the id for the measurement to query and returnsit as json
func (s *SmartContract) queryMeasurementByID(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Must pass 1 argument. The argument is id of measurement.")
	}

	measurementAsJson, _ := APIstub.GetState(args[0])
	return shim.Success(measurementAsJson)
}

//This method adds a new measurement according to the passed arguments
func (s *SmartContract) addNewMeasurement(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	val, ok, err := cid.GetAttributeValue(APIstub, "role")

	if err != nil {

		return shim.Error("Error while retrieving attributes")
	}

	if !ok {
		return shim.Error("Client identity does not posses the attribute")
	}

	if val != "Field_Staff"{
		fmt.Println("Attribute role: " + val)
		return shim.Error("Only user with role as Field_Staff has access to this method")
	}

	//There are a total of 6 arguments including the measurement id
	if len(args) != 9 {
		return shim.Error("There are a total of 6 arguments required (including the measurement id)")
	}

	

	//Making sure that the measurement id does not exist already
	//If it does not exist, the value returned on querying should be nil

	checkVal, err := APIstub.GetState(args[0])

	if err != nil {
		return shim.Error(err.Error())
	}

	if checkVal != nil {
		return shim.Error("Error! A measurement with this id already exists.")
	}

	var measurement = Measurement{WellID: args[0], TotalDisposition: args[1], ClosingInventory: args[2], OpeningInventory: args[3], 
		Receipts: args[4], Temperature: args[5], Viscosity: args[6], Username: args[7], Approved: "No", OilOrGas: args[8], Reason: "Measurement Added"}


	
	measurementBytes, _ := json.Marshal(measurement)
	APIstub.PutState(args[0], measurementBytes)

	indexName := "person~key"
	uniqueIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{measurement.Username, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(uniqueIndexKey, value)

	return shim.Success(measurementBytes)
}

func (S *SmartContract) getMeasurementByPersonID(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


	


	if len(args) != 1 {
		return shim.Error("Must pass exactly one argument (person id)")
	}
	person := args[0]

	assetsByThisPerson, err := APIstub.GetStateByPartialCompositeKey("person~key", []string{person})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer assetsByThisPerson.Close()

	var measurements []byte //The json to be returned is created in this variable
	measurements = append([]byte("["))

	if assetsByThisPerson.HasNext() {
		asset, err := assetsByThisPerson.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		_, compositeKey, err := APIstub.SplitCompositeKey(asset.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		var measurementID = compositeKey[1]
		measurementJson, err := APIstub.GetState(measurementID)

		if err != nil {
			return shim.Error(err.Error())
		}
		measurements = append(measurements, measurementJson...)
		measurements = append(measurements, []byte("\n")...)
	}

	for assetsByThisPerson.HasNext() {

		asset, err := assetsByThisPerson.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		_, compositeKey, err := APIstub.SplitCompositeKey(asset.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		var measurementID = compositeKey[1]
		measurementJson, err := APIstub.GetState(measurementID)

		if err != nil {
			return shim.Error(err.Error())
		}
		measurements = append(measurements, []byte(",")...)
		measurements = append(measurements, measurementJson...)
		measurements = append(measurements, []byte("\n")...)
	}

	//Closing json array for measurements
	measurements = append(measurements, []byte("]")...)

	return shim.Success(measurements)
}

//Since it is not possible to get all the records, we return records in range from 0 to 99999999
func (s *SmartContract) queryAllMeasurements(APIstub shim.ChaincodeStubInterface) sc.Response {

	startKey := "0"
	endKey := "999999999"

	allRecordsIterator, err := APIstub.GetStateByRange(startKey, endKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer allRecordsIterator.Close()

	var jsonString bytes.Buffer
	jsonString.WriteString("[")

	flag := false
	for allRecordsIterator.HasNext() {
		queryResponse, err := allRecordsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if flag == true {
			jsonString.WriteString(",")
		}
		jsonString.WriteString("{\"Key\":")
		jsonString.WriteString("\"")
		jsonString.WriteString(queryResponse.Key)
		jsonString.WriteString("\"")

		jsonString.WriteString(", \"Record\":")

		jsonString.WriteString(string(queryResponse.Value))
		jsonString.WriteString("}\n")
		flag = true
	}
	jsonString.WriteString("]")

	return shim.Success(jsonString.Bytes())
}

//The update data gets the same arguments as create measurements function. It is responsible for updating the attributes over the same id
func (s *SmartContract) updateData(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


	val, ok, err := cid.GetAttributeValue(APIstub, "role")

	if err != nil {

		return shim.Error("Error while retrieving attributes")
	}

	if !ok {
		return shim.Error("Client identity does not posses the attribute")
	}

	if val != "Production_Accountant"{
		fmt.Println("Attribute role: " + val)
		return shim.Error("Only user with role as Production_Accountant has access to this method")
	}

	//There are a total of 6 arguments including the measurement id
	if len(args) != 9 {
		return shim.Error("There are a total of 9 arguments required (including the measurement id)")
	}	



	measurementBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}

	var measurement = Measurement{}

	json.Unmarshal(measurementBytes, &measurement)

	measurement.WellID = args[0]
	measurement.TotalDisposition = args[1]
	measurement.ClosingInventory = args[2]
	measurement.OpeningInventory = args[3]
	measurement.Receipts = args[4]
	measurement.Temperature = args[5]
	measurement.Viscosity = args[6]
	measurement.Username = args[7]
	measurement.Reason = args[8]
	measurement.Approved = "No"




	measurementBytes, err = json.Marshal(measurement)
	APIstub.PutState(args[0], measurementBytes)

	return shim.Success(measurementBytes)

}


//This method approves the measurement
func (s *SmartContract) approveMeasurement(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {


	val, ok, err := cid.GetAttributeValue(APIstub, "role")

	if err != nil {

		return shim.Error("Error while retrieving attributes")
	}

	if !ok {
		return shim.Error("Client identity does not posses the attribute")
	}

	if val != "Officer_Of_The_Company"{
		fmt.Println("Attribute role: " + val)
		return shim.Error("Only user with role as Officer_Of_The_Company has access to this method")
	}

	//There are a total of 1 arguments including the measurement id
	if len(args) != 2 {
		return shim.Error("There are a total of 2 arguments required (including the measurement id)")
	}	




	measurementBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}

	var measurement = Measurement{}

	json.Unmarshal(measurementBytes, &measurement)

	measurement.Approved = "Yes"
	measurement.Username = args[1]
	measurement.Reason = "Measurement Approved"


	measurementBytes, err = json.Marshal(measurement)
	APIstub.PutState(args[0], measurementBytes)

	return shim.Success(measurementBytes)

}

//This method gets history of the measurement
func (t *SmartContract) getHistoryForAsset(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Must pass the id of measurement")
	}

	allTransactions, err := stub.GetHistoryForKey(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}
	defer allTransactions.Close()

	var jsonString bytes.Buffer
	jsonString.WriteString("[")

	firstTime := true
	for allTransactions.HasNext() {
		singleTransaction, err := allTransactions.Next()
		if err != nil {
			return shim.Error(err.Error())
		}

		if !firstTime {
			jsonString.WriteString(",")
		}
		jsonString.WriteString("{\"TxId\":")
		jsonString.WriteString("\"")
		jsonString.WriteString(singleTransaction.TxId)
		jsonString.WriteString("\"")

		jsonString.WriteString(", \"Value\":")

		if singleTransaction.IsDelete {
			jsonString.WriteString("null")
		} else {
			jsonString.WriteString(string(singleTransaction.Value))
		}

		jsonString.WriteString(", \"Timestamp\":")
		jsonString.WriteString("\"")
		jsonString.WriteString(time.Unix(singleTransaction.Timestamp.Seconds, int64(singleTransaction.Timestamp.Nanos)).String())
		jsonString.WriteString("\"")

		jsonString.WriteString(", \"IsDelete\":")
		jsonString.WriteString("\"")
		jsonString.WriteString(strconv.FormatBool(singleTransaction.IsDelete))
		jsonString.WriteString("\"")

		jsonString.WriteString("}\n")
		firstTime = false
	}
	jsonString.WriteString("]")

	return shim.Success(jsonString.Bytes())
}



//The main method only acts as a placeholder for suppressing error messages. There is no need for it in chaincode
func main() {

	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}

}
