```js

contract Alba{
    mapping(address => employ) public employList;  //고용주 계약서 내용
    //mapping(address => mapping(uint => employ)) public myEmployList;  //account를 이용하여 내 계약서 볼수 있게할 예정
    mapping(address => employYN) public yesORno;       //계약이 되었는지 목록 확인
    mapping(address => work) public workerList;            //알바생 정보 구초제를 위한 맵핑
    address public employer;                //고용주 계정 주소
    address public albaWorker;              //알바생 계정주소
    
    struct employ{          //고용주 계약정보
        string employerName;//고용주 이름
        uint phone;     //고용주 전화번호
        uint employPay; //급여
        uint date;      //근로날짜
        string location;//근로장소
        string memo;    //계약내용
  
    }
    struct employYN{    //고용확인 완료 구조체  
        address empName; //고용주이름으로 검색할수 있도록 할 예정(String 타입 아니면 address타입으로 계정으로 저장하는것으로 할예정)
        address wokName; //알바생 이름(마찬가지)
        bool employORNotyet;    //고용이 되었는지 아닌지 판단
    }
    
    struct work{    //알바생 정보
        string workerName;  //알바생 이름
        uint wPhone;    //알바생 전화번호
        uint age;       //알바생 나이
    }


    constructor() public {      //고용주 계약생성시 고용주 계정을 contract의 생성자로
        employer = msg.sender;
        yesORno[employer] = employYN(employer,albaWorker,false);
    }


    //계약서 생성 정보 저장 고용주만 생성가능
    function addEmploy( string memory _employer1, uint _phone, uint _employPay, uint _date, string memory _location, string memory _memo) external {
        if(msg.sender == employer){
             employList[employer] = employ(_employer1, _phone, _employPay, _date, _location, _memo);
        }else{
            revert("not employer, please check your account.");
        }
    }

    //알바생만 생성 가능    알바 정보 저장
    function addWorker(string memory _worker, uint _wPhone, uint _age) external { 
        albaWorker = msg.sender;
        workerList[albaWorker] = work(_worker, _wPhone, _age);
        //yesORno[_num].wokName = albaWorker;
    }

    function Employcontract(uint _num) external{    //계약하기  고용주와 알바생의 계정 저장
        if(_num > 0){
            yesORno[employer].wokName = albaWorker;
            yesORno[employer].employORNotyet = true;
        }
    }

    function pushmessageComplte() public returns(uint256){     //버튼을 누르면 전화번호 전송
        uint256 employphone = employList[employer].phone;
        uint256 workerphone = workerList[albaWorker].wPhone;
        return employphone; 
        return workerphone;
    }
}

```