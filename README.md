# blockchain_system_hyperledger_fabric
Blockchain based regulatory reporting and calculation of energy royalties. A system supporting smart contracts for managing oil and gas measurements with 9 peer nodes and 3 orderer nodes running in docker containers.

# Salient Features
1. 3 types of users: Field Staff, Production Accountant and Officer Of the Company
2. Field Staff can enter oil or gas measurement
3. Production Accountant can edit the measurement
4. Officer of the company can approve the measurement
5. All accounts have permission to view data in the blockchain
6. Account security checks are in the blockchain layer
7. Secure transactions in the blockchain
8. JWT authentication adds an additional layer of security
9. The frontend interacts with the blockchain using api
10. The api is secured using JWT
11. Nodes in the blokchain use Raft consensus protocol
12. History of each measurement remains saved. The person who made the change is always traceable.

# Output

## Login Screen

## Oil Measurement Screen

## Gas Measurement Screen

## All Data Stored in the Blockchain

## Edit or Approve Measurement Screen

## API server

# Accounts for Logging in Directly
username: field_staff1 password: password
username: production_accountant1 password: password
username: officer_of_the_company1 password: password

#Operating System
Ubuntu 20.04.2 LTS

# How to Run?
1. Download the repository
2. cd artifacts
3. docker-compose up -d
4. cd ..
5. ./createChannel.sh
6. ./mDeployChaincode.sh
7. Open another terminal
8. cd api
9. npm install
10. nodemon app.js
11. Open another terminal
12. cd Frontend
13. cd ReactLoginRegisterUI-master
14. npm install
15. npm start

# Dependencies
1. Curl (for downloading hyperledger fabric)
2. Hyperledger Fabric
3. Docker 20.10.2
4. Docker-Compose 1.25.0
5. Npm 6.14.4
6. Node 10.19.0
7. Golang
8. Python 2.7.18
