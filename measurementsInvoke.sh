export CORE_PEER_TLS_ENABLED=true
export ORDERER_CA=${PWD}/artifacts/channel/crypto-config/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem
export PEER0_ORG1_CA=${PWD}/artifacts/channel/crypto-config/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export PEER0_ORG2_CA=${PWD}/artifacts/channel/crypto-config/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export FABRIC_CFG_PATH=${PWD}/artifacts/channel/config/

export PRIVATE_DATA_CONFIG=${PWD}/artifacts/private-data/collections_config.json

export CHANNEL_NAME=mychannel

CHANNEL_NAME="mychannel"
CC_RUNTIME_LANGUAGE="golang"
VERSION="1"
CC_SRC_PATH="./artifacts/src/measurement/"
CC_NAME="measurement"


setGlobalsForPeer0Org1() {
    export CORE_PEER_LOCALMSPID="Org1MSP"
    export CORE_PEER_TLS_ROOTCERT_FILE=$PEER0_ORG1_CA
    export CORE_PEER_MSPCONFIGPATH=${PWD}/artifacts/channel/crypto-config/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
    export CORE_PEER_ADDRESS=localhost:7051
}

#Pass all arguments as parameter
invokeAddNewMeasurement() {



    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        -c "{\"function\": \"addNewMeasurement\",\"Args\":[\"$1\", \"$2\", \"$3\", \"$4\", \"$5\", \"$6\"]}"
}


invokeQueryMeasurementByID() {



    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        -c "{\"function\": \"queryMeasurementByID\",\"Args\":[\"$1\"]}"
}


invokeGetMeasurementByPersonID(){

    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        -c "{\"function\": \"getMeasurementByPersonID\",\"Args\":[\"$1\"]}"


}


invokeUpdateData(){

    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        -c "{\"function\": \"updateData\",\"Args\":[\"$1\", \"$2\", \"$3\", \"$4\", \"$5\", \"$6\"]}"

}

invokeGetHistoryForAsset(){
    setGlobalsForPeer0Org1
    peer chaincode invoke -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com \
        --tls $CORE_PEER_TLS_ENABLED \
        --cafile $ORDERER_CA \
        -C $CHANNEL_NAME -n ${CC_NAME} \
        --peerAddresses localhost:7051 --tlsRootCertFiles $PEER0_ORG1_CA \
        -c "{\"function\": \"getHistoryForAsset\",\"Args\":[\"$1\"]}"

}

invokeQueryAll() {
    setGlobalsForPeer0Org1

    peer chaincode query -C $CHANNEL_NAME -n ${CC_NAME} -c '{"function": "queryAllMeasurements","Args":[]}'

}



getBlock() {
    setGlobalsForPeer0Org1

    peer channel getinfo  -c mychannel -o localhost:7050 \
        --ordererTLSHostnameOverride orderer.example.com --tls \
        --cafile $ORDERER_CA
}


# getSpecificBlock(){
#     peer channel fetch config -c mychannel -o localhost:7050 \
#     --ordererTLSHostnameOverride orderer.example.com --tls \
#     --cafile $ORDERER_CA
# }




#Arguments Passed in order: wellID personID uncorrectedVolume staticPressure flowingTemperature
#invokeAddNewMeasurement 1 3 3 4 5 6


# invokeQueryAll

# # Arguments Passed: measurementID
invokeQueryMeasurementByID 2


# # Arguments Passed: personID
# invokeGetMeasurementByPersonID 3

# #Arguments Passed in order: id wellID personID uncorrectedVolume staticPressure flowingTemperature
# invokeUpdateData 0 123 123 123 123 123 123



# # Arguments Passed: MeasurementID
# invokeGetHistoryForAsset 0


# getBlock

# getSpecificBlock

