---
title: Build Smart Contract using Ethereum Blockchain to book PG
date: "2021-10-26"
coverImage: "coverimage.png"
author: "Aritra Belel"
tags: ["Blockchain", "Ethereum","Solidity"]
description: "Build your first smart contract using solidity, where you can upload your PG for rent, people can sign rental agreement and pay rent."
---

## Basics about Smart Contract !

[**Smart Contracts**](https://en.wikipedia.org/wiki/Smart_contract) 📝 are simple programs which are stored on blockchain network.
<br>
You can say it's like an agreement between two people in the form of computer code. The transactions that happen in a smart contract are processed by the blockchain & stored as **42 character hex address** (with prefix : `"0x"`), which means they can be sent automatically without a third party.

**🤔 Remember :** They are stored on a public database and once a smart contract is deployed it cannot be changed.

### What is Solidity ?

One of the most popular language to build smart contract is Solidity. It's an OOP language used to build smart contract on Ethereum Blockchain.

### Let's build our first Smart Contract :

1. Open **`Remix` IDE** from [here](https://remix.ethereum.org/).
2. Click on `Sure` & then `Done`.
3. Under `default_workshop`, click on `create new file`.
4. Rename it as `pg.sol`.

Now we are ready to write our first **Smart Contract**. 🤩

### Contract Code :

1. We have to provide our `solidity version` in the smart contract :
```
pragma solidity ^0.5.16;
```
2. Now we have to create the main contract named `pg` :
```
contract PG{
    ...
}
```
>Now, inside the `contract pg{...}` follow all this steps :
3. Now we have to create some **variables** where the smart contract will store the [**payable**](https://ethereum.stackexchange.com/questions/20874/payable-function-in-solidity) `address` (42 char hex string with prefix : `"0x"`) of the `Landlord` & the `Tenant`, 
    
```
    address payable tenant;
    address payable landlord;
```
4. Now we have to create some [**public**](https://ethereum.stackexchange.com/questions/19380/external-vs-public-best-practices) **variables** where the smart contract will store some integer values. For this we have a data-type called : `uint` (256-bit unsigned integer)

```
    uint public no_of_rooms = 0;
    uint public no_of_agreement = 0;
    uint public no_of_rent = 0;
```
5. Now we will create a `structure` to store details of each PG rooms :
>  like: `PG no.` , `PG name`, `PG address`, `No of total agreements`, `Monthly rent`, `One time security deposit`, `Last agreement sign time`, `Vacancy`, `Landlord address`, `Current Tenant Address`
```
    struct Room{
        uint roomid;
        uint agreementid;
        string roomname;
        string roomaddress;
        uint rent_per_month;
        uint securityDeposit;
        uint timestamp;
        bool vacant;
        address payable landlord;
        address payable currentTenant;
    }
```
6. Now we will `map` previous `structure` with an `uint`(named : `roomid`) .
```
mapping(uint => Room) public Room_by_No;
```
7. Like the previous way now, we will create a `structure` for each `Rental Agreement` and will map that with an `uint`(named : `agreementid`) .
>  which will store details like: `PG no.` ,`Agreement No`, `PG name`, `PG address`, `Monthly rent`, `One time security deposit`,`Lockin Period`, `Agreement sign time`, `Landlord address`, `Tenant Address`
```
    struct RoomAgreement{
        uint roomid;
        uint agreementid;
        string Roomname;
        string RoomAddresss;
        uint rent_per_month;
        uint securityDeposit;
        uint lockInPeriod;
        uint timestamp;
        address payable tenantAddress;
        address payable landlordAddress;
    }
```
```
mapping(uint => RoomAgreement) public RoomAgreement_by_No;
```

8. Like the previous way for the last time, we will create a `structure` for each `Rent` payment and will map that with an `uint`.
>  which will store details like: `Rent No.` , `PG no.` ,`Agreement No`, `PG name`, `PG address`, `Monthly rent`, `Rent payment time`, `Landlord address`, `Tenant Address`
```
    struct Rent{
        uint rentno;
        uint roomid;
        uint agreementid;
        string Roomname;
        string RoomAddresss;
        uint rent_per_month;
        uint timestamp;
        address payable tenantAddress;
        address payable landlordAddress;
    }
```
```
   mapping(uint => Rent) public Rent_by_No;
```
9. Now we will create few [**modifiers**](https://ethereum.stackexchange.com/questions/29867/using-require-or-modifier/29868) , which will help us to verify few things before running a function

    (Here `require(...);` means : if the given condition is not satisfied then, the function will not execute & the given string will be appear as error code.)
> Will check whether the message sender is the Landlord or not
    
```
    modifier onlyLandlord(uint _index) {
        require(msg.sender == Room_by_No[_index].landlord, "Only landlord can access this");
        _;
    }
```
> Will check whether the message sender is anyone except the Landlord.
```
    modifier notLandLord(uint _index) {
        require(msg.sender != Room_by_No[_index].landlord, "Only Tenant can access this");
        _;
    }
```
> Will check whether the room is vacant or not
```   
    modifier OnlyWhileVacant(uint _index){
        
        require(Room_by_No[_index].vacant == true, "Room is currently Occupied.");
        _;
    }
```
> Will check whether the tenant have enough `Ether` in his wallet to pay rent
```
    modifier enoughRent(uint _index) {
        require(msg.value >= uint(Room_by_No[_index].rent_per_month), "Not enough Ether in your wallet");
        _;
    }
```
> Will check whether the tenant have enough `Ether` in his wallet to pay one time security deposit & one months rent in advance.
``` 
    modifier enoughAgreementfee(uint _index) {
        require(msg.value >= uint(uint(Room_by_No[_index].rent_per_month) + uint(Room_by_No[_index].securityDeposit)), "Not enough Ether in your wallet");
        _;
    }
```
> Will check whether the tenant address is same who have signed the previous rental agreement
```   
    modifier sameTenant(uint _index) {
        require(msg.sender == Room_by_No[_index].currentTenant, "No previous agreement found with you & landlord");
        _;
    }
```
> Will check whether there is any time left for the agreement to end
```   
    modifier AgreementTimesLeft(uint _index) {
        uint _AgreementNo = Room_by_No[_index].agreementid;
        uint time = RoomAgreement_by_No[_AgreementNo].timestamp + RoomAgreement_by_No[_AgreementNo].lockInPeriod;
        require(now < time, "Agreement already Ended");
        _;
    }
```
> Will check whether 365 days has been passed after last agreement created
```
    modifier AgreementTimesUp(uint _index) {
        uint _AgreementNo = Room_by_No[_index].agreementid;
        uint time = RoomAgreement_by_No[_AgreementNo].timestamp + RoomAgreement_by_No[_AgreementNo].lockInPeriod;
        require(now > time, "Times left for contract to end");
        _;
    }
```
> Will check whether 30 days has been passed after last rent payment
``` 
    modifier RentTimesUp(uint _index) {
        uint time = Room_by_No[_index].timestamp + 30 days;
        require(now == time, "Time left to pay Rent");
        _;
    }
```

10. Now we will create few [**functions**](https://docs.soliditylang.org/en/v0.4.24/introduction-to-smart-contracts.html)

> This function will be used to Add Rooms : 

```
    function addRoom(string memory _roomname, string memory _roomaddress, uint _rentcost, uint  _securitydeposit) public {
        require(msg.sender != address(0));
        no_of_rooms ++;
        bool _vacancy = true;
        Room_by_No[no_of_rooms] = Room(no_of_rooms,0,_roomname,_roomaddress, _rentcost,_securitydeposit,0,_vacancy, msg.sender, address(0)); 
        
    }
```
> This function will be used to Sign Rental Agreements: Here the function will only run if user's account address & landlord's account address isn't same , user have enough agreement fee in his/her wallet , room should be vacant.

```
    function signAgreement(uint _index) public payable notLandLord(_index) enoughAgreementfee(_index) OnlyWhileVacant(_index) {
        require(msg.sender != address(0));
        address payable _landlord = Room_by_No[_index].landlord;
        uint totalfee = Room_by_No[_index].rent_per_month + Room_by_No[_index].securityDeposit;
        _landlord.transfer(totalfee);
        no_of_agreement++;
        Room_by_No[_index].currentTenant = msg.sender;
        Room_by_No[_index].vacant = false;
        Room_by_No[_index].timestamp = block.timestamp;
        Room_by_No[_index].agreementid = no_of_agreement;
        RoomAgreement_by_No[no_of_agreement]=RoomAgreement(_index,no_of_agreement,Room_by_No[_index].roomname,Room_by_No[_index].roomaddress,Room_by_No[_index].rent_per_month,Room_by_No[_index].securityDeposit,365 days,block.timestamp,msg.sender,_landlord);
        no_of_rent++;
        Rent_by_No[no_of_rent] = Rent(no_of_rent,_index,no_of_agreement,Room_by_No[_index].roomname,Room_by_No[_index].roomaddress,Room_by_No[_index].rent_per_month,now,msg.sender,_landlord);
    }
```
> This function will be used to Pay Monthly Rents : Here the function will only run if user's account address & previous tenant's account address is same , user have enough rent fee in his/her wallet , there is a gap of 30 days between previous transaction.
```
    function payRent(uint _index) public payable sameTenant(_index) RentTimesUp(_index) enoughRent(_index){
        require(msg.sender != address(0));
        address payable _landlord = Room_by_No[_index].landlord;
        uint _rent = Room_by_No[_index].rent_per_month;
        _landlord.transfer(_rent);
        Room_by_No[_index].currentTenant = msg.sender;
        Room_by_No[_index].vacant = false;
        no_of_rent++;
        Rent_by_No[no_of_rent] = Rent(no_of_rent,_index,Room_by_No[_index].agreementid,Room_by_No[_index].roomname,Room_by_No[_index].roomaddress,_rent,now,msg.sender,Room_by_No[_index].landlord);
    }
```
> This function will be used to Vacant the Room after 365 days : Here the function will only run if user's account address & landlord's account address is same , room should not be vacant, there is a gap of 365 days after previous agreement.
```
    function agreementCompleted(uint _index) public payable onlyLandlord(_index) AgreementTimesUp(_index){
        require(msg.sender != address(0));
        require(Room_by_No[_index].vacant == false, "Room is currently Occupied.");
        Room_by_No[_index].vacant = true;
        address payable _Tenant = Room_by_No[_index].currentTenant;
        uint _securitydeposit = Room_by_No[_index].securityDeposit;
        _Tenant.transfer(_securitydeposit);
    }
```
> This function will be used to Terminate Agreements before 365 days :  Here the function will only run if user's account address & landlord's account address is same , there is a gap of less than 365 days after previous agreement.
```
    function agreementTerminated(uint _index, uint _terminateno) public onlyLandlord(_index) AgreementTimesLeft(_index){
        require(msg.sender != address(0));
        Room_by_No[_index].vacant = true;
    }
```

### Compile :
Now click on the `Solidity Compile` option in the left side bar.
1. Select compiler version : `0.5.16+`
2. Then click on : `Compile pg.sol`

> Like this :

<img src="https://user-images.githubusercontent.com/82683890/138772443-85038f73-35be-497c-a808-55b4e6254509.png" height="400px"/>

### Deploy :
Now click on the `Deploy & Run Transactions` option in the left side bar.
1. Choose `Environment` : `JavaScript VM (London)`
2. Now click on `Deploy`

<img height="400px" alt="after deployed" src="https://user-images.githubusercontent.com/82683890/138773015-382e810f-4bb7-4ff6-a491-6b9a3a6df23b.png">

**🎉 Congratulations your Smart Contract has been Deployed. 🎉**

### Sample Transactions :
>Now you have to remember, that whenever a transaction is getting executed it stores all the details in an unique `hash` key.

Now, Under `Deployed Contract` click on `> PG AT ..... (MEMORY)`
1. Click on the `V` icon (Dropdown Menu) of `addRoom` function.
2. Fill up the details.
> Like this :

<img height="250px" alt="addroom" src="https://user-images.githubusercontent.com/82683890/138773006-276b9324-b321-4b5b-9038-e36d2b60d8cc.png">

> Note : You are entering your details in `wei` not in `ether` (1 ether = 1000000000000000000 wei)
3. Then click on `transact`

**🎉 Congratulations you have successfully added your 1st Room on the contract. 🎉**

(You can find the same in the terminal also.)

Now the Landlord of the room is your 1st Ether Address. (The one with 99.99 Test Ethers in wallet)

4. Now change the `Account Address` from the drop down menu. (Choose anyone except one with 99.99 Ether)

<img height="300px" alt="change address" src="https://user-images.githubusercontent.com/82683890/138773021-0312f2d3-bf17-43eb-b565-c45d113413f6.png">

5. Now add the total amount you previously chosen as (rent cost + Security Deposit)
6. And then from the dropdown `wei` choose : `ether`

<img height="300px" alt="change value sign" src="https://user-images.githubusercontent.com/82683890/138773026-5ea9039f-6b4b-47c1-b3f0-6c647d236ad2.png">

7. Now scroll down & click on : `signAgreement`, enter : `1` & press : `signAgreement`

You can check the same by entering `RoomAgreementNo` : `1` 

<img height="420px" alt="room details" src="https://user-images.githubusercontent.com/82683890/138773031-abffa4cd-58dd-45b9-bd4a-aa2619146fac.png">

<br>

**🎉 Congratulations you have successfully signed your 1st agreement. 🎉**

#### Your all transactions will be shown in the `terminal`.

<img width="580" alt="transactions" src="https://user-images.githubusercontent.com/82683890/138773547-59287df8-7119-4f11-aa57-70234b8e4636.png">

Now you can cross verify this by checking your `ether` account address.

### Advantages of smart Contract:

Now you may ask , "What is the use of smart contract, when there are other several centralised methods?".

Now I will tell you some advantages of Smart Contract over centralised system:
1. Here data cannot be changed or tampered. So, it is almost impossible for hackers to manipulate data.
2. It's completely decentralised.
3. Unlike any centralised payment wallet, you don't have to pay any commission percentages to the middle man during any transactions.

#### Storage & others :
Now you may also ask "How all transactions are being recorded?"

So you have to remember that, Smart Contract stores data in a block of blockchain & all transactions are stored with an unique `hash` key.

In Remix IDE, you can download the complete transactions history as a `json` file.
For that you have to follow these steps :
1. Click `Deploy & Run Transaction`
2. Then expand the `Transactions Recorded (..) V` dropdown menu.
3. Then Click on the `Save` icon.
4. Press `ok`. 

#### Gas Fee :
Now you may have noticed that, whenever a transaction is getting executed, a few `wei` is getting deducted from your ether wallet. 
<br>So, it is called `gas fee`, which is the payments made by users to compensate for the computing energy required to process and validate transactions. 
<br>Now as more Ethereum miners will come up in near future then `gas fee` will also decrease in an inverse relation. 

#### Future Possibilities :
After this , in future if you want to build a fullstack website using `React` then you can use this `Smart Contract` as backend.

For that you need to install/download : 

**Frontend :**
1. [Node.js](https://nodejs.org/en/)

**Backend :**
1. [web3.js](https://www.npmjs.com/package/web3)
2. [Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

**For Testing Purpose :**
1. [Ganache](https://www.trufflesuite.com/ganache)
2. [Metamask](https://metamask.io/)

And then just follow the [official documentation](https://web3js.readthedocs.io/en/v1.5.2/) of Web3.js to connect your smart contract with your react app.
### Conclusion :
So, now you have successfully understand what is solidity & how Smart Contract works.

Also you have successfully build and deployed a perfectly working Smart Contract (where tenant can pay rent in ether directly to the landlord's wallet without paying a single wei to any middle man)

<!-- To download the complete code click [here](). -->