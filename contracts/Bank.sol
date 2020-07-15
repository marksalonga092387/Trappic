pragma solidity >=0.4.21 <0.7.0;

contract LTO
{
    int index;
    constructor () public
    {
        index = 0;
    }
     struct data {
         int vno;
         int dno;
         string name;
        string violation;
        string location;
        int enno;
        bool status;
        string date;
    }
    
    struct data1 {
        string due;
        int payment;
        int penalty;
        string statusl;
    }
    mapping (int => data)public myMapping;
    mapping (int => data1)public myMapping1;
    function addEntry(int _dno,string memory _name,string memory _violation,string memory _location,int _enno,
    string memory _date,string memory _due,int _payment,int _penalty,string memory _status1) 
    public {
        myMapping[index].dno = _dno;
        myMapping[index].name = _name;
        myMapping[index].violation = _violation;
        myMapping[index].location = _location;
        myMapping[index].enno = _enno;
        myMapping[index].date = _date;
        myMapping[index].status = false;
        myMapping[index].vno = index;
        myMapping1[index].due = _due;
        myMapping1[index].payment = _payment;
        myMapping1[index].penalty = _penalty;
        myMapping1[index].statusl = _status1;
        index++;
    }
    
    function getlength() public view returns(int)
    {
        return index;
    }
    function getnumoff(int _enno) public view returns(int)
    {
        int num = 0;
        for(int x=0;x < index;x++)
        {
            if(myMapping[x].enno==_enno)
            {
                num++;
            }
        }
        return num;
    }
    
    function getnumvio(int _enno) public view returns(int)
    {
        int num = 0;
        for(int x=0;x < index;x++)
        {
            if(myMapping[x].dno == _enno)
            {
                num++;
            }
        }
        return num;
    }
    function getdata(int _index)public view returns(int enno,string memory name,string memory date,string memory violation,
    string memory location)
    {
        return (myMapping[_index].enno,myMapping[_index].name, myMapping[_index].date,myMapping[_index].violation,myMapping[_index].location);
    }
    function getpdata(int _index)public view returns(int enno,int dno,string memory date,string memory violation,
    bool status)
    {
        return (myMapping[_index].enno,myMapping[_index].dno, myMapping[_index].date,myMapping[_index].violation,myMapping[_index].status);
    }
    function getddata(int _index)public view returns(int enno,int dno,string memory date,string memory violation,string memory locantion,
    bool status)
    {
        return (myMapping[_index].enno,myMapping[_index].dno, myMapping[_index].date,myMapping[_index].violation,myMapping[_index].location,
        myMapping[_index].status);
    }
}




