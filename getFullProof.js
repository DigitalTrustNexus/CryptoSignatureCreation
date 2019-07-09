const chp = require('chainpoint-client')

async function runIt () {

  // Retrieve a Calendar proof for each hash that was submitted
  let proofs = await chp.getProofs(proofHandles)
  console.log("Proof Objects: Expand objects below to inspect.")
  console.log(proofs)

  // Verify every anchor in every Calendar proof
  let verifiedProofs = await chp.verifyProofs(proofs)
  console.log("Verified Proof Objects: Expand objects below to inspect.")
  console.log(verifiedProofs)
}

runIt()
