pragma solidity 0.4.24;

import "./SafeMath.sol";
import "./Token.sol";

contract Splitter {
  using SafeMath for uint256;

  TokenInterface private token;

  event onIncome(uint256 _amount);
  event onSplit(uint256 _inputAmount, uint256 _percentage, address indexed _user, uint256 _outputAmount);

  constructor (address _tokenContract) public{
    token = TokenInterface(_tokenContract);
  }

  function setTokenInterface(address _tokenContract) external /*onlyAdmin*/{
    token = TokenInterface(_tokenContract);
  }

  function income() public payable{
    address[] memory users = token.getAllUsers();
    for (uint256 i = 0; i < users.length; i++) {
      address user = users[i];
      uint256 share = token.getTokenAmount(users[i]);
      uint256 totalAmount = token.getTotalAmount();
      uint256 percentage = SafeMath.div(share, totalAmount);
      uint256 output = SafeMath.div(SafeMath.mul(msg.value, share),totalAmount);
      user.transfer(output);

      emit onSplit(msg.value, percentage, user, output);
    }
  }
}

contract SplitterInterface{
  function setTokenInterface(address _tokenContract) external;
  function income() public payable;
}