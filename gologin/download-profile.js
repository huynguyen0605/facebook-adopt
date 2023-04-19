const getProfile = require('./get-profile.js');
var request = require("request");
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM4MjllZTM4NDRiNWI2OGQ1ZGFlMGYiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NDM4MmEwNzcwZmVjNmZjMDk3OGFhNjIifQ.b5FedFX3YmS84vpmeyCAsderSKVacdVDYXtNnKLOk88"
// var idProfile = "6421be928ed557d5488c0c17";

async function downloadProfile(page) {
  const idProfile = await getProfile(page);
  var options = {
    method: "GET",
    // url: `https://api.gologin.com/browser/${idProfile}`,
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
  // await page.waitForTimeout(5000);
  // console.log(idProfile);
  console.log("Profile ID: ", idProfile);
  options.url = `https://api.gologin.com/browser/${idProfile}`;
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
}
module.exports = downloadProfile;

