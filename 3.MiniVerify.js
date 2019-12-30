var deasync = require('deasync');
var fs = require('fs');
const chp = require('chainpoint-client')

async function runIt () {

   var fileName = "./proofs/c42899d1b434a556eb6b55f4285651e315742b117dd6dbd82cff302e74c4a8be.prf";
   //var proof = JSON.parse(fs.readFileSync(fileName)).proof;
   //var proofs = [];
   //proofs.push(proof);
   proofs = [JSON.parse(fs.readFileSync(fileName)).proof];
	
   console.log("proofs = " + proofs);
   console.log("typeof proofs:" + typeof proofs);

   let proofVerifies = await chp.verifyProofs(proofs);
   console.log("Verified Proof Objects.")
   console.log(proofVerifies)
   var blcProof = proofVerifies[1].verified
   console.log("Second verify type:" + proofVerifies[1].type);
   console.log("Blockchain verify results: " + blcProof);
   console.log("Proof length:" + proofVerifies.length);

}

runIt()
