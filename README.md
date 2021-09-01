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

# Architecture
The app uses a layered architecture. However, unlike other applications, the security checks are placed in the bottom most (blockchain) layer. This ensures that there is little to no vulnerability in the interface for upper layers. Since blockchain is a very sequre mechanism, the application is safe from attacks.

![Screenshot 2021-07-26 at 10 36 26 AM](https://user-images.githubusercontent.com/60880656/127681584-e83b6a42-3dbb-4952-b3b1-cbb39635ebba.png)


# Output

## Login Screen
![login](https://user-images.githubusercontent.com/60880656/127679794-01e0005b-0ca2-409f-990e-3f8faf8bd0e9.png)

## Oil Measurement Screen
![oil](https://user-images.githubusercontent.com/60880656/127679825-b2058673-8b3b-49dd-92c7-96f22e124461.png)

## Gas Measurement Screen
![gas](https://user-images.githubusercontent.com/60880656/127679832-59b82a6b-7edc-459a-a3c9-04f123694a13.png)

## All Data Stored in the Blockchain
![details](https://user-images.githubusercontent.com/60880656/127679849-7bc97428-b3c7-44c7-905e-116220e75897.png)

## Edit or Approve Measurement Screen
![edit](https://user-images.githubusercontent.com/60880656/127679861-b1e69e36-e24f-4ff7-99c1-e0691e70180c.png)

## API server
![apiserver](https://user-images.githubusercontent.com/60880656/127679898-4fba4d08-d929-4481-b8e6-9288d2e89557.png)


# Postman Collection
The postman collection can be found inside api/postman-collection

# Accounts for Logging in Directly
username: field_staff1 password: password
username: production_accountant1 password: password
username: officer_of_the_company1 password: password

# Operating System
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
