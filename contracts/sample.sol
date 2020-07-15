pragma solidity >=0.4.21 <0.7.0;

contract sample
{
    int public index;
    constructor () public
    {
        index = 0;
    }
     struct data {
        string name;
        bool isSet;
    }
    mapping (int => data) public myMapping;
    function addEntry(string memory name) public {

        myMapping[index].isSet = true;
        myMapping[index].name = name;
        index++;
    }
    function display(int n) public view returns(string memory)
    {
        return myMapping[n].name;
    }
    function getname() public view returns(string memory)
    {
        return myMapping[0].name;
    }
    function getlength() public view returns(int)
    {
        return index;
    }
}




