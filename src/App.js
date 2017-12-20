import React, { Component } from 'react'
import MyTokenContract from '../build/contracts/MyToken.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tokens: 0,
      addressTo: 0
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.web3 = results.web3;

      // Instantiate contract once web3 provided.
      this.instantiateContract();
    })
    .catch(error => {
      console.log(error);
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract');
    this.myToken = contract(MyTokenContract);
    this.myToken.setProvider(this.web3.currentProvider);
    this.getBalance();
  }

  getBalance() {
    this.web3.eth.getAccounts((error, accounts) =>
      this.myToken.deployed()
        .then(instance => instance.balanceOf(accounts[0]))
        .then(balance => this.setState({tokens: balance}))
        .catch(error => {
          console.log(error);
        })
    );
  }

  sendToken() {
    this.web3.eth.getAccounts((error, accounts) => {
      this.myToken.deployed()
        .then(instance => instance.transfer(this.state.addressTo, 1, {from: accounts[0]}))
        .then(() => this.getBalance())
        .catch(error => {
          console.log(error);
        })
    }
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
            <a href="#" className="pure-menu-heading pure-menu-link">My Token</a>
        </nav>

        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>You own : {this.state.tokens.toString(10)} tokens</h1>
              <input name="addressTo" value={this.state.addressTo} onChange={event => this.setState({addressTo: event.target.value})}/>
              <button className="pure-button" onClick={() => this.sendToken()}>
                Send a token!
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App
