pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract MyToken is StandardToken {
  string public name = 'MyToken';
  string public symbol = 'MT';
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 1000;

  function MyToken() public {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }
}
