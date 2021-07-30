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
)

var logger2 = flogging.MustGetLogger("royaltycalculation")

// SmartContract Define the Smart Contract structure
type CalculationSmartContract struct {
}

//The royaltycalculation structure represents the measurement inputted by the field staff
type RoyaltyCalculation struct {
	MeasurementID    string `json:"measurementid"`
	PersonID         string `json:"personid"`
	IsApproved       string `json:"isapproved"`
	ApprovalPersonID string `json:"approvalpersonid"`
}

//The Init method initializes the smart contract
func (s *CalculationSmartContract) Init(APIstub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

//The Invoke method helps invoke the appropriate method
func (s *CalculationSmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	function, args := APIstub.GetFunctionAndParameters()

	switch function {
	case "addNewCalculation":
		return s.addNewCalculation(APIstub, args)
	case "queryCalculationByID":
		return s.queryCalculationByID(APIstub, args)
	case "getCalculationByPersonID":
		return s.getCalculationByPersonID(APIstub, args)
	case "queryAllCalculations":
		return s.queryAllCalculations(APIstub)
	case "updateData":
		return s.updateData(APIstub, args)
	case "getHistoryForAsset":
		return s.getHistoryForAsset(APIstub, args)

	default:
		return shim.Error("Invalid Calculation Smart Contract function name.")
	}

}

//This method gets the id for the calculation to query and returnsit as json
func (s *CalculationSmartContract) queryCalculationByID(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Must pass 1 argument. The argument is id of measurement.")
	}

	calculationAsJson, _ := APIstub.GetState(args[0])
	return shim.Success(calculationAsJson)
}

//This method adds a new measurement according to the passed arguments
func (s *CalculationSmartContract) addNewCalculation(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	//There are a total of 6 arguments including the calculation id
	if len(args) != 5 {
		return shim.Error("There are a total of 5 arguments required (including the calculation id)")
	}

	//Making sure that the calculation id does not exist already
	//If it does not exist, the value returned on querying should be nil

	checkVal, err := APIstub.GetState(args[0])

	if err != nil {
		return shim.Error(err.Error())
	}

	if checkVal != nil {
		return shim.Error("Error! A calculation with this id already exists.")
	}

	var calculation = RoyaltyCalculation{MeasurementID: args[1], PersonID: args[2], IsApproved: args[3], ApprovalPersonID: args[4]}

	calculationBytes, _ := json.Marshal(calculation)
	APIstub.PutState(args[0], calculationBytes)

	indexName := "person~key"
	uniqueIndexKey, err := APIstub.CreateCompositeKey(indexName, []string{calculation.PersonID, args[0]})
	if err != nil {
		return shim.Error(err.Error())
	}
	value := []byte{0x00}
	APIstub.PutState(uniqueIndexKey, value)

	return shim.Success(calculationBytes)
}

func (S *CalculationSmartContract) getCalculationByPersonID(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Must pass exactly one argument (person id)")
	}
	person := args[0]

	assetsByThisPerson, err := APIstub.GetStateByPartialCompositeKey("person~key", []string{person})
	if err != nil {
		return shim.Error(err.Error())
	}

	defer assetsByThisPerson.Close()

	var calculations []byte //The json to be returned is created in this variable
	calculations = append([]byte("["))

	if assetsByThisPerson.HasNext() {
		asset, err := assetsByThisPerson.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		_, compositeKey, err := APIstub.SplitCompositeKey(asset.Key)
		if err != nil {
			return shim.Error(err.Error())
		}

		var calculationID = compositeKey[1]
		calculationJson, err := APIstub.GetState(calculationID)

		if err != nil {
			return shim.Error(err.Error())
		}
		calculations = append(calculations, calculationJson...)
		calculations = append(calculations, []byte("\n")...)
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

		var calculationID = compositeKey[1]
		calculationJson, err := APIstub.GetState(calculationID)

		if err != nil {
			return shim.Error(err.Error())
		}
		calculations = append(calculations, []byte(",")...)
		calculations = append(calculations, calculationJson...)
		calculations = append(calculations, []byte("\n")...)
	}

	//Closing json array for measurements
	calculations = append(calculations, []byte("]")...)

	return shim.Success(calculations)
}

//Since it is not possible to get all the records, we return records in range from 0 to 99999999
func (s *CalculationSmartContract) queryAllCalculations(APIstub shim.ChaincodeStubInterface) sc.Response {

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
func (s *CalculationSmartContract) updateData(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	//There are a total of 5 arguments including the measurement id
	if len(args) != 5 {
		return shim.Error("There are a total of 6 arguments required (including the calculation id)")
	}

	calculationBytes, err := APIstub.GetState(args[0])
	if err != nil {
		return shim.Error(err.Error())
	}

	var calculation = RoyaltyCalculation{}

	json.Unmarshal(calculationBytes, &calculation)

	calculation.MeasurementID = args[1]
	calculation.PersonID = args[2]
	calculation.IsApproved = args[3]
	calculation.ApprovalPersonID = args[4]

	calculationBytes, err = json.Marshal(calculation)
	APIstub.PutState(args[0], calculationBytes)

	return shim.Success(calculationBytes)

}

//This method gets history of the measurement
func (t *CalculationSmartContract) getHistoryForAsset(stub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) < 1 {
		return shim.Error("Must pass the id of calculation")
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

// func (s *SmartContract) queryPrivateDataHash(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

// 	if len(args) != 2 {
// 		return shim.Error("Incorrect number of arguments. Expecting 2")
// 	}
// 	carAsBytes, _ := APIstub.GetPrivateDataHash(args[0], args[1])
// 	return shim.Success(carAsBytes)
// }

//The main method only acts as a placeholder for suppressing error messages. There is no need for it in chaincode
func main() {

	err := shim.Start(new(CalculationSmartContract))

	if err != nil {
		fmt.Printf("Error creating Calculation Smart Contract")
	}
}
