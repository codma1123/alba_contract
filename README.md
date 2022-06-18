
```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
//===== (추가내용 표시)
contract Alba{
    mapping(address => employ) public employList;  //고용주 계약서 내용
    //mapping(address => mapping(uint => employ)) public myEmployList;  //account를 이용하여 내 계약서 볼수 있게할 예정
    //mapping(address => employYN) public yesORno;       //계약이 되었는지 목록 확인
    mapping(address => work) public workerList;            //알바생 정보 구초제를 위한 맵핑
    
    address public employer;                //고용주 계정 주소
    address public albaWorker;              //알바생 계정주소
    
    struct employ{          //고용주 계약정보
        address empAccount;//고용주 계정
        string employerName;//고용주 이름
        string employPhone;     //고용주 전화번호
        string pay; //급여
        string date;      //근로날짜
        string etime;       //근로시간
        string location;//근로장소
        string memo;    //계약내용
  
    }

    struct employYN{    //고용확인 완료 구조체  
        string location;//근로장소
        string date;      //근로날짜
        string time;    //근로시간
        string Pay; //급여
        string memo;    //계약내용
        string albaName;     //알바생 이름
        string empphone;     //고용주 전화번호
        string albaPhoe;    //알바생 전화번호
        address empAddr; //고용주 계정
        address albaaddr; //알바생 이름(마찬가지)
        bool employORNotyet;    //고용이 되었는지 아닌지 판단
    }
    
    struct work{    //알바생 정보
        address workerAccount; //알바생 계정
        string workerName;  //알바생 이름
        string wPhone;    //알바생 전화번호
        uint age;       //알바생 나이
    }
    
    employYN[] public employcontract;

    constructor() public {      //고용주 계약생성시 고용주 계정을 contract의 생성자로
        employer = msg.sender;
    }

    //계약서 생성 정보 저장 고용주만 생성가능
    function addEmploy( string memory _employer, string memory _phone, string memory _employPay, string memory _date, string memory _time, string memory _location, string memory _memo) public {
        require(employer == msg.sender);     //========= 고용주만 입력 가능           
        if(msg.sender == employer){
             employList[employer] = employ(employer, _employer, _phone, _employPay, _date, _time,_location, _memo);
        }else{
            revert("not employer, please check your account.");
        }
    }

    //알바생만 생성 가능    알바 정보 저장
    function addWorker(string memory _worker, string memory _wPhone, uint _age) public { 
        albaWorker = msg.sender;              
        workerList[albaWorker] = work(albaWorker, _worker, _wPhone, _age);
    }

    function Employcontract()  public{    //계약하기  고용주와 알바생의 계정 저
        employcontract.push(employYN(
            employList[employer].location,
            employList[employer].date,
            employList[employer].etime,
            employList[employer].pay,
            employList[employer].memo,
            workerList[albaWorker].workerName,
            employList[employer].employPhone,
            workerList[albaWorker].wPhone,
            employer,albaWorker,false
            ));
        }
    }

```