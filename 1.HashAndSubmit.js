var fs = require('fs');
var crypto = require('crypto');
const chp = require('chainpoint-client')

// the file you want to get the hash    
//var file = 'designFiles/Turbine_Blade_Good.stl';
var file = process.argv[2]
var fd = fs.createReadStream(file);
var hash = crypto.createHash('sha256');
hash.setEncoding('hex');

fd.on('end', function() {
    hash.end();
    var hashHexString = hash.read();
    console.log("hash for file " +file + ":");
    console.log(hashHexString);
    runIt(hashHexString);
});

async function runIt (hash) {
  let hashes = [hash];

  // Submit the hash to three randomly selected Nodes
  let proofHandles = await chp.submitHashes(hashes);
  console.log(proofHandles);

   var proofHandlesSample = 
  [ { uri: 'http://159.65.77.168',
    hash: '1d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0a',
    hashIdNode: 'bc5387f0-7cb0-11e9-8d1e-016aed8e9660',
    groupId: 'bb340e30-7cb0-11e9-bd05-1745a5fd7db2' },
  { uri: 'http://159.65.77.168',
    hash: '2d2a9e92b561440e8d27a21eed114f7018105db00262af7d7087f7dea9986b0a',
    hashIdNode: 'bc5387f1-7cb0-11e9-8d1e-01fc947ff3bb',
    groupId: 'bb340e31-7cb0-11e9-bd05-1745a5fd7db2' }];

  var outputFileHDL = "submitHandles/"+hash+".hdl";
  fs.writeFile(outputFileHDL,JSON.stringify(proofHandles,null,2), function (err) {
    if (err)
        return console.log(err);
    console.log('Handles write to the output file:' + outputFileHDL);
  });

  // Wait for Calendar proofs to be available
  console.log("Sleeping 12 seconds to wait for canlendar proofs to generate...")
  await new Promise(resolve => setTimeout(resolve, 12000));

  // Retrieve a Calendar proof for each hash that was submitted
  let proofs = await chp.getProofs(proofHandles);
  console.log("Proof for hash:" + hash);
  proofsSample = 
  [ { hashIdNode: 'bc5387f0-7cb0-11e9-8d1e-016aed8e9660',
    proof: 'eJyNU0uOHEUQ5QgcgiU9HRGZkZ9ajcQVvPKmFZEZSZc0dLe6ysZejtmwnQUHMB40BrFBQiy5R0schqyescFjkFyLKikr34v3Il58//ay7HezvZj/3M7zYRrW62/dWC/2x6/XZSvj7rAfd/P6ubudXx7sl6/eH91uZdqeLrGSZMukHNB7sFQpCqFZRfQtAiYErgpAgaTFGiHF/jHJOQUF+XWh2Yx1s9tXO32hhV2/AKtYFFaIllepoq0Ag1hNlkOAP86Q6Zl+M86z3SM3Mv9OgHkFvCJ6gmHwbnD09D192R8X+qqYkf9NLynETi8ph6YJ7SP6Bfnf9Pz0rR5lV7Y23bz66UrUrn4rcrVZjvbHzf2/N/vD9Ndnn1+/vjp9eVY61uFTXF7/uD/cTVtZEYfr18fTZSFukKCELEL9esre1eI8EHN11twyhn5FXQMGSo40mdOCTjwFto8IY7AGWLg1oIrOSqvcTQonBuPgmnJMMWdxaBTNWe9Oqdov+kC99IeE3d65U4u9T+jyY/APu3Gan9OA3Mt75xL0Z2iCmXykHFxqkVoNrTA7FWxsGBZBSYC0NRc0SjfqIfqexFR9fymWoOzz0qbCOSAnwtw4u4ymAtH5uCitoefXSfdYgCCbrzFXzy0/VnlZeryrkqH2TiQrHIPvsY4Oc1fiSitZMrdCXXYi9YzOJ6lRVMFbDI8JsyMfkg/vfHuMAw7vNlEv/lnBZSOHnq7hAXEeYXCQvWnu82ZSbU4axNRaKSlkDjEAEoS+i0G0CWmOUrK6DMCl+fLhCO/uczvdfHfe9Te92M8PUR7r3UPZ22fHcbo5XfyfxHVH2a7Kcf0AWC/r9DfMGWv2',
    anchorsComplete: [ 'cal' ] }];

  console.log(proofs);

  outputFilePRF = "proofs/"+hash+".calendar.prf";
  fs.writeFile(outputFilePRF,JSON.stringify(proofs,null,2), function (err) {
    if (err)
        return console.log(err);
    console.log('Calendar proof write to the output file:' + outputFilePRF);
  }); 

  // Verify every anchor in every Calendar proof
  var date = getDateTime();
  outputFileRSLT = "proofs/"+hash+"."+date+".rslt";
  let verifiedProofs = await chp.verifyProofs(proofs)
  console.log(verifiedProofs)
  fs.writeFile(outputFileRSLT,JSON.stringify(verifiedProofs,null,2), function (err) {
  if (err)
      return console.log(err);
  console.log('Canlendar proof results write to the output file:' + outputFileRSLT);
  }); 
}

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return year +  month + day + hour + min + sec;
}

fd.pipe(hash);
