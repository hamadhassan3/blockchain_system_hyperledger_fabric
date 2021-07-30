const { Gateway, Wallets, } = require('fabric-network');
const fs = require('fs');
const path = require("path")
const log4js = require('log4js');
const logger = log4js.getLogger('BasicNetwork');
const util = require('util')


const helper = require('./helper')
const query = async (channelName, chaincodeName, args, fcn, username, org_name) => {

    try {


        const ccp = await helper.getCCP(org_name)


        const walletPath = await helper.getWalletPath(org_name)
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);


        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }


        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
        });


        const network = await gateway.getNetwork(channelName);

        const contract = network.getContract(chaincodeName);
        

        



        if (fcn == "queryMeasurementByID") {

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


        result = JSON.parse(result.toString());
        return result
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        return error.message

    }
}

exports.query = query