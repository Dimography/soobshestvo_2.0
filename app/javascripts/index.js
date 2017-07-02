web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesReceived","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"x","type":"bytes32"}],"name":"bytes32ToString","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForOption","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"contractOwner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]')
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at('0x1d7da5e06b9caa56a1d3f5886890f08b02a887b6');
options = {"option1": "option-1", "option2": "option-2", "option3": "option-3"}

function voteForOption(option) {
  optionName = option;
  console.log('optionName:', optionName);
  console.log('option:', option);
  contractInstance.voteForOption(optionName, {from: '0x327042e2a04f4793e10368a44eb7d28ec4a705e9'}, function() {
    let div_id = optionName;
    $("#" + options[optionName]).html(contractInstance.totalVotesFor.call(optionName).toString());
  });
}

$(document).ready(function() {
  optionNames = Object.keys(options);
  for (var i = 0; i < optionNames.length; i++) {
    let name = optionNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    $("#" + options[name]).html(val);
  }
});
