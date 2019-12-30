const chp = require('chainpoint-client')

async function runIt () {
  proofHandles = 
[ { uri: 'http://95.216.198.25',
    hash:
     'bb279a3a26947f64c9e148c7a81096a1e11b2a3d0651cb17b4e03d543399d9df',
    hashIdNode: 'a956b2b0-c8e8-11e9-a2a3-011585d83dd6',
    groupId: 'a880ec20-c8e8-11e9-a39f-5f8cf0776753' },
  { uri: 'http://159.65.102.87',
    hash:
     'bb279a3a26947f64c9e148c7a81096a1e11b2a3d0651cb17b4e03d543399d9df',
    hashIdNode: 'a934d2d0-c8e8-11e9-b37e-0169b12ee781',
    groupId: 'a880ec20-c8e8-11e9-a39f-5f8cf0776753' },
  { uri: 'http://167.99.163.169',
    hash:
     'bb279a3a26947f64c9e148c7a81096a1e11b2a3d0651cb17b4e03d543399d9df',
    hashIdNode: 'a934abc0-c8e8-11e9-a964-01427f1f20ed',
    groupId: 'a880ec20-c8e8-11e9-a39f-5f8cf0776753' } ]

  // Verify every anchor in every Calendar proof
  let proofs = await chp.getProofs(proofHandles)
  console.log("Verified Proof Objects: Expand objects below to inspect.")
  console.log(proofs)
}

runIt()
