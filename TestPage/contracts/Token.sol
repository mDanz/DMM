pragma solidity 0.4.24;

import "./SafeMath.sol";

contract Token{
  using SafeMath for uint256;
  address private adminContract;
  address private controllerContract;

  uint256 private totalAmount;
  address[] private users;
  mapping (address => uint256) shares;

  modifier isAdminContract(){
    require(msg.sender == adminContract, 'Only an admin is able to interact.');
    _;
  }

  modifier isControllerContract(){
    require(msg.sender == controllerContract, 'Only the Controller is able to interact.');
    _;
  }

  constructor (address _adminAddress, address _controllerAddress) public{
    adminContract = _adminAddress;
    controllerContract = _controllerAddress;
  }

  function setAdminContract(address _adminContract) external /*onlyAdmin*/{
    adminContract = _adminContract;
  }

  function setControllerContract(address _controllerAddress) external /*isAdminContract*/{
    controllerContract = _controllerAddress;
  }

  function setUserTokens(address _user, uint256 _newValue) external /*isControllerContract*/{
    uint256 previousValue = shares[_user];

    shares[_user] = _newValue;
    totalAmount += _newValue - previousValue;
    bool newUser = true;
    for (uint256 i = 0; i < users.length; i++) {
      if (users[i] == _user){
        newUser = false;
      }
    }
    if (newUser == true){
      users.push(_user);
    }
  }

  function getTokenAmount(address _user) public view returns (uint256){
    return shares[_user];
  }

  function getPercentage(address _user) public view returns (uint256){
    SafeMath.div(shares[_user], totalAmount);
  }

  function getTotalAmount() public view returns (uint256){
    return totalAmount;
  }

  function getAllUsers() public view returns(address[]){
    return users;
  }
}

contract TokenInterface{
  function setAdminContract(address _adminContract) external;
  function setControllerContract(address _controllerAddress) external;
  function setUserTokens(address _user, uint256 _newValue) external;
  function getTokenAmount(address _user) public view returns (uint256);
  function getPercentage(address _user) public view returns (uint256);
  function getTotalAmount() public view returns (uint256);
  function getAllUsers() public view returns(address[]);
}