pragma solidity 0.4.24;

import "./SafeMath.sol";

contract PowerChangers{
	using SafeMath for uint256;

	address private adminContract;

	address[] private powerChangers;
	uint256 private powerChangerCount;
	uint256 private requirement;

	modifier onlyAdminContract(){
		require(msg.sender == adminContract, 'Only an admin is able to interact.');
		_;
	}

	constructor(address _adminContract) public{
		adminContract = _adminContract;
	}

	function setAdminContract(address _adminContract) external /*onlyAdmin*/{
		adminContract = _adminContract;
	}

	function addPC(address _address) external /*onlyAdminContract*/{
		powerChangers.push(_address);
		powerChangerCount += 1;
	}

	function removePC(address _address) external /*onlyAdminContract*/{
		require(isPC(_address));
		uint256 index = getPCIndex(_address);
		delete powerChangers[index];
	}

	function setRequirement(uint256 _percent) external /*onlyAdminContract*/{
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

	function getsApproved(uint256 _confirmationCount) public view returns(bool){
		uint256 confirmations = SafeMath.div(SafeMath.mul(_confirmationCount, 100), powerChangerCount);
		if(confirmations >= requirement){
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
	function setAdminContract(address _adminContract) external;
	function addPC(address _address) external;
	function removePC(address _address) external;
	function setRequirement(uint256 _percent) external;
	function getRequirement() public view returns(uint256);
	function getAllPC() public view returns(address[]);
	function isPC(address _address) public view returns(bool);
	function getsApproved(uint256 _confirmationCount) public view returns(bool);
	function getPCIndex(address _address) public view returns(uint256);
	function getPCCount() public view returns(uint256);
}