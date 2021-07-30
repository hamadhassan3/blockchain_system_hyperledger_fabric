const { Gateway, Wallets, TxEventHandler, GatewayOptions, DefaultEventHandlerStrategies, TxEventHandlerFactory } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')

const helper = require('./helper')

const invokeTransaction = async (channelName, chaincodeName, fcn, args, username, org_name) => {
    try {
        logger.debug(util.format('\n============ invoke transaction on channel %s ============\n', channelName));

        const ccp = await helper.getCCP(org_name);


        //Getting the wallet to check if user is present
        const walletPath = await helper.getWalletPath(org_name);
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        //The user must be enrolled and present in the wallet
        let identity = await wallet.get(username);
        if (!identity) {
            return;
        }
        //The attributes for establishing the connection
        const connectOptions = {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true },
            eventHandlerOptions: {
                commitTimeout: 100,
                strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ALLFORTX
            }
        }
        const gateway = new Gateway();  //The gateway to the network
        await gateway.connect(ccp, connectOptions); //Establishing the connection with network
        const network = await gateway.getNetwork(channelName);  //The getting the network connected to our channel
        const contract = network.getContract(chaincodeName);    //Getting the Contract we want to execute
        let result
        let message;
        if (fcn == "addNewMeasurement") {
            //Calling the smart contract
            result = await contract.submitTransaction(fcn, args[0], args[1], args[2], args[3], args[4], args[5], args[6], username, args[7]);
            message = `Successfully added the measurement with Well ID ${args[0]}`
        }
        else if(fcn == "updateData"){
            result = await contract.submitTransaction(fcn, args[0], args[1], args[2], args[3], args[4], args[5], args[6], username, args[7]);
            message = `Successfully updated the measurement with Well ID ${args[0]}`
        }
        else if(fcn == "approveMeasurement"){
            result = await contract.submitTransaction(fcn, args[0], username);
            message = `Successfully approved the measurement with Well ID ${args[0]}`            
        }
        else if (fcn == "queryMeasurementByID") {

            console.log(fcn);
            console.log(args);
            result = await contract.submitTransaction(fcn, args[0]);
            console.log(fcn);
        }
        else if(fcn == "getMeasurementByPersonID"){
            console.log(fcn);
            console.log(args);
            result = await contract.submitTransaction(fcn, args[0]);
            console.log(fcn);
        }
        else if(fcn == "queryAllMeasurements"){
            console.log(fcn);
            console.log(args);
            result = await contract.submitTransaction(fcn);
            console.log(fcn);            
        }
        else if(fcn == "getHistoryForAsset"){
            console.log(fcn);
            console.log(args);
            result = await contract.submitTransaction(fcn, args[0]);
            console.log(fcn);            
        }

        else { return `The function ${fcn} is not supported by the smart contract`}
        await gateway.disconnect();

        result = JSON.parse(result.toString());

        let response = {
            message: message,
            result
        }

        return response;


    } catch (error) {

        console.log(`Getting error: ${error}`)
        return error.message

    }
}

exports.invokeTransaction = invokeTransaction;