const chp = require('chainpoint-client')

async function runIt () {
  proofHandles = 
[
  {
    "uri": "http://217.61.124.63",
    "hash": "1669b4e6ac3db813105b12b1bc211f994c5917f0052b5db45300db673a6e7c54",
    "hashIdNode": "7b371260-8be1-11e9-9194-01f3c673b975",
    "groupId": "7b2e11b0-8be1-11e9-a0c5-67978c0077ae"
  },
  {
    "uri": "http://159.69.112.70",
    "hash": "1669b4e6ac3db813105b12b1bc211f994c5917f0052b5db45300db673a6e7c54",
    "hashIdNode": "7b3600f0-8be1-11e9-a731-01dac530e6f7",
    "groupId": "7b2e11b0-8be1-11e9-a0c5-67978c0077ae"
  },
  {
    "uri": "http://80.211.208.222",
    "hash": "1669b4e6ac3db813105b12b1bc211f994c5917f0052b5db45300db673a6e7c54",
    "hashIdNode": "7b37d5b0-8be1-11e9-8c88-01c7fc0ca382",
    "groupId": "7b2e11b0-8be1-11e9-a0c5-67978c0077ae"
  }
]
  // Verify every anchor in every Calendar proof
  let proofs = await chp.getProofs(proofHandles)
  console.log("Verified Proof Objects: Expand objects below to inspect.")
  console.log(proofs)
}

runIt()
