const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const readline = require('readline-sync');
const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const name = readline.question("Enter your name: ");
  const tree = new MerkleTree(niceList)
  const root = tree.getRoot();
  const index = niceList.findIndex(n => n === name);

  const proof = tree.getProof(index);
  
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof: proof,
    name: name,
  });

  console.log({ gift });
}

main();