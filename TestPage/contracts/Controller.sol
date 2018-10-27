pragma solidity 0.4.24;

import "./SafeMath.sol";
import "./PowerChangers.sol";
import "./Token.sol";

contract Controller{
	PowerChangersInterface private powerChangers;
	TokenInterface private token;

	address private adminContract;
	address private pcContract;

	struct Change{
		uint256 confirmationCount;
		uint256 amount;
		address user;
		address[] confirmations;
		bool approved;
	}

	Change[] public changes;

	modifier isAdminContract(){
		require(msg.sender == adminContract, 'Only an admin is able to interact.');
		_;
	}

	modifier onlyPC(){
		require(powerChangers.isPC(msg.sender), 'Only a Power Changer is able to interact.');
		_;
	}

	constructor(address _adminAddress, address _PCAddress) public{
		adminContract = _adminAddress;
		pcContract = _PCAddress;
	}

	function setAdminContract(address _adminContract) external /*onlyAdmin*/{
		adminContract = _adminContract;
	}

	function setPCContract(address _PCAddress) external /*isAdminContract*/{
		pcContract = _PCAddress;
	}

	function initiateChange(uint256 _amount, address _user) external /*onlyPC*/{
		address[] memory arr = new address[](1);
		arr[0] = tx.origin;
		changes.push(Change(1, _amount, _user, arr, false));
	}

	function approveChange(uint256 _id) external /*onlyPC*/{
		for (uint256 i = 0; i < changes[_id].confirmations.length; i++) {
			if(changes[_id].confirmations[i] == tx.origin){
				revert('You already approved this change.');
			}
		}
		changes[_id].confirmations.push(tx.origin);
		changes[_id].confirmationCount += 1;
		if (powerChangers.getsApproved(changes[_id].confirmationCount)){
			executeChange(_id);
		}
	}

	function revokeApproval(uint256 _id) external /*onlyPC*/{
		require(changes[_id].approved != true);
		if (changes[_id].confirmations[0] == tx.origin){
			delete changes[_id];
		} else {
			for (uint256 i = 0; i < changes[_id].confirmations.length; i++) {
				if(changes[_id].confirmations[i] == tx.origin){
					delete changes[_id].confirmations[i];
					changes[_id].confirmationCount -= 1;
				}
			}
		}
	}

	function executeChange(uint256 _id) internal{
		token.setUserTokens(changes[_id].user, changes[_id].amount);
	}

	function isApproved(uint256 _id) public view returns(bool){
		return changes[_id].approved;
	}

	function getChange(uint256 _id) public view returns(uint256, uint256, address, bool){
		return (changes[_id].confirmationCount, changes[_id].amount, changes[_id].user, changes[_id].approved);
	}

	function getChanges() public view returns(uint256[], uint256[], address[], bool[]){
		uint256[] memory confirmationCount = new uint256[](changes.length);
		uint256[] memory amount = new uint256[](changes.length);
		address[] memory user = new address[](changes.length);
		bool[] memory approvals = new bool[](changes.length);
		for (uint256 i = 0; i < changes.length; i++) {
			confirmationCount[i] = changes[i].confirmationCount;
			amount[i] = changes[i].amount;
			user[i] = changes[i].user;
			approvals[i] = changes[i].approved;
		}
	}

	function getChanges(uint256 _from, uint256 _to) public view returns(uint256[], uint256[], address[], bool[]){
		require(_to < changes.length);
		uint256[] memory confirmationCount = new uint256[](changes.length);
		uint256[] memory amount = new uint256[](changes.length);
		address[] memory user = new address[](changes.length);
		bool[] memory approvals = new bool[](changes.length);
		for (uint256 i = _from; i < _to; i++) {
			confirmationCount[i] = changes[i].confirmationCount;
			amount[i] = changes[i].amount;
			user[i] = changes[i].user;
			approvals[i] = changes[i].approved;
		}
	}

	function getPendingChanges() public view returns(uint256[], uint256[], address[], bool[]){
		uint256[] memory confirmationCount = new uint256[](changes.length);
		uint256[] memory amount = new uint256[](changes.length);
		address[] memory user = new address[](changes.length);
		bool[] memory approvals = new bool[](changes.length);
		for (uint256 i = 0; i < changes.length; i++) {
			if(changes[i].approved == false){
				confirmationCount[i] = changes[i].confirmationCount;
				amount[i] = changes[i].amount;
				user[i] = changes[i].user;
				approvals[i] = changes[i].approved;
			}
		}
	}

	function getPendingChanges(uint256 _from, uint256 _to) public view returns(uint256[], uint256[], address[], bool[]){
		require(_to < changes.length);
		uint256[] memory confirmationCount = new uint256[](changes.length);
		uint256[] memory amount = new uint256[](changes.length);
		address[] memory user = new address[](changes.length);
		bool[] memory approvals = new bool[](changes.length);
		for (uint256 i = _from; i < _to; i++) {
			if(changes[i].approved == false){
				confirmationCount[i] = changes[i].confirmationCount;
				amount[i] = changes[i].amount;
				user[i] = changes[i].user;
				approvals[i] = changes[i].approved;
			}
		}
	}
}

contract ControllerInterface{
	function setAdminContract(address _adminContract) external;
	function setPCContract(address _PCAddress) external;
	function initiateChange(uint256 _amount, address _user) external;
	function approveChange(uint256 _id) external;
	function revokeApproval(uint256 _id) external;
	function executeChange(uint256 _id) internal;
	function isApproved(uint256 _id) public view returns(bool);
	function getChange(uint256 _id) public view returns(uint256, uint256, address, bool);
	function getChanges() public view returns(uint256[], uint256[], address[], bool[]);
	function getChanges(uint256 _from, uint256 _to) public view returns(uint256[], uint256[], address[], bool[]);
	function getPendingChanges() public view returns(uint256[], uint256[], address[], bool[]);
	function getPendingChanges(uint256 _from, uint256 _to) public view returns(uint256[], uint256[], address[], bool[]);
}