pragma solidity 0.4.24;

import "./Admin.sol";
import "./Controller.sol";
import "./Splitter.sol";

contract Master{
  AdminInterface public adminContract;
  PowerChangersInterface public powerChangersContract;
  ControllerInterface public controllerContract;
  TokenInterface public tokenContract;
  SplitterInterface public splitterContract;

  mapping (address => bool) private isMaster;

  modifier onlyMaster(){
    require(isMaster[msg.sender] == true, 'You are not a master.');
    _;
  }

  constructor (address _adminContract, address _powerChangersContract, address _controllerContract, address _tokenContract, address _splitterContract, address[] _master) public{
    adminContract = AdminInterface(_adminContract);
    powerChangersContract = PowerChangersInterface(_powerChangersContract);
    controllerContract = ControllerInterface(_controllerContract);
    tokenContract = TokenInterface(_tokenContract);
    splitterContract = SplitterInterface(_splitterContract);
    for (uint256 i = 0; i < _master.length; i++){
      isMaster[_master[i]] = true;
    }
  }

  function setAdminInterface(address _adminContract) external onlyMaster{
    adminContract = AdminInterface(_adminContract);
  }

  function setPowerChangersInterface(address _powerChangersContract) external onlyMaster{
    powerChangersContract = PowerChangersInterface(_powerChangersContract);
  }

  function setControllerInterface(address _controllerContract) external onlyMaster{
    controllerContract = ControllerInterface(_controllerContract);
  }

  function setTokenInterface(address _tokenContract) external onlyMaster{
    tokenContract = TokenInterface(_tokenContract);
  }

  function setSplitterInterface(address _splitterContract) external onlyMaster{
    splitterContract = SplitterInterface(_splitterContract);
  }

  function getAdminInterface() public view returns(address){
    return adminContract;
  }

  function getPowerChangersInterface() public view returns(address){
    return powerChangersContract;
  }

  function getControllerInterface() public view returns(address){
    return controllerContract;
  }

  function getTokenInterface() public view returns(address){
    return tokenContract;
  }

  function getSplitterInterface() public view returns(address){
    return splitterContract;
  }
}

contract MasterInterface{
  function setAdminInterface(address _adminContract) external;
  function setPowerChangersInterface(address _powerChangersInterfaceAddr) external;
  function setControllerInterface(address _controllerContract) external;
  function setTokenInterface(address _tokenContract) external;
  function setSplitterInterface(address _splitterContract) external;
  function getAdminInterface() public view returns(address);
  function getPowerChangersInterface() public view returns(address);
  function getControllerInterface() public view returns(address);
  function getTokenInterface() public view returns(address);
  function getSplitterInterface() public view returns(address);
}