pragma solidity 0.4.24;

import "./PowerChangers.sol";

contract Admin{
  PowerChangersInterface private powerChangers;

  mapping (address => bool) private isAdmin;
  uint256 private requirement = 100;

  modifier onlyAdmin(){
    require(isAdmin[msg.sender] == true, 'You are not an admin.');
    _;
  }

  constructor (address[] _admins) public{
    for (uint256 i = 0; i < _admins.length; i++){
      isAdmin[_admins[i]] = true;
    }
  }

  function setPowerChangersInterface(address _powerChangersInterfaceAddr) external onlyAdmin{
    powerChangers = PowerChangersInterface(_powerChangersInterfaceAddr);
  }

  function addChanger(address _user) external onlyAdmin{
    powerChangers.addPC(_user);
  }

  function revokeChanger(address _user) external onlyAdmin{
    powerChangers.removePC(_user);
  }

  function setRequirement(uint256 _percent) external onlyAdmin{
    powerChangers.setRequirement(_percent);
  }

  function isAdminUser(address _address)public view returns(bool){
    return isAdmin[_address];
  }
}

contract AdminInterface{
  function setPowerChangersInterface(address _powerChangersInterfaceAddr) external;
  function addChanger(address _user) external;
  function revokeChanger(address _user) external;
  function setRequirement(uint256 _percent) external;
  function isAdminUser(address _address) public view;
}