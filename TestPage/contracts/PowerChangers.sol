pragma solidity 0.4.24;

import "./SafeMath.sol";

contract PowerChangers{
    using SafeMath for uint256;
      
	address private adminContract;

	address[] private powerChangers;
	uint256 private powerChangerCount;
	uint256 private requirement;

	modifier isAdminContract(){
		require(msg.sender == adminContract, 'Only an admin is able to interact.');
		_;
	}

	constructor(address _adminContract) public{
		adminContract = _adminContract;
	}

	/*function setPowerChangersInterface(address _powerChangersInterfaceAddr) external isAdmin{
		powerChangers = powerChangersInterface(_powerChangersInterfaceAddr);
	}*/

	function addPC(address _address) external isAdminContract{
		powerChangers.push(_address);
		powerChangerCount += 1;
	}

	function removePC(address _address) external isAdminContract{
		require(isPC(_address));
		uint256 index = getPCIndex(_address);
		delete powerChangers[index];
	}

	function setRequirement(uint256 _percent) external isAdminContract{
		assert(_percent <= 100 && _percent >= 0);
		requirement = _percent;
	}

	function getRequirement() public view returns(uint256){
		return requirement;
	}

	function getAllPC() public view returns(address[]){
		return powerChangers;
	}

	function isPC(address _address) public view returns(bool){
		for (uint256 i = 0; i < powerChangers.length; i++) {
			if (powerChangers[i] == _address){
				return true;
			}
		}
		return false;
	}

	function getsApproved(uint256 _confirmations) public view returns(bool){
		uint256 confirmations = SafeMath.mul(_confirmations, 100);
		uint256 maxCount = SafeMath.mul(powerChangerCount, 100);
		uint256 result = SafeMath.div(SafeMath.div(confirmations, maxCount), 100);
		if(result >= requirement){
			return true;
		} else {
			return false;
		}
	}

	function getPCIndex(address _address) public view returns(uint256){
		for (uint256 i = 0; i < powerChangers.length; i++) {
			if (powerChangers[i] == _address){
				return i;
			}
		}
		revert('This user is not a power Changer.');
	}

	function getPCCount() public view returns(uint256){
		return powerChangerCount;
	}
}

contract PowerChangersInterface{
	function addPC(address _address) external;
	function removePC(address _address) external;
	function setRequirement(uint256 _percent) external;
	function getRequirement() public view returns(uint256);
	function getAllPC() public view returns(address[]);
	function isPC(address _address) public view returns(bool);
	function getsApproved(uint256 _confirmations) public view returns(bool);
	function getPCIndex(address _address) public view returns(uint256);
	function getPCCount() public view returns(uint256);
}