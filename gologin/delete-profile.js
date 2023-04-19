var request = require("request");
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM4MjllZTM4NDRiNWI2OGQ1ZGFlMGYiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NDM4MmEwNzcwZmVjNmZjMDk3OGFhNjIifQ.b5FedFX3YmS84vpmeyCAsderSKVacdVDYXtNnKLOk88"
var profileId = "64133e3c2e43b4c8bc719ea1"
var options = {
  method: "DELETE",
  url: `https://api.gologin.com/browser/${profileId}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
async function deleteProfile(page) {
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});}
module.exports = deleteProfile;

