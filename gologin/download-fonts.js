const getProfile = require('./get-profile.js');
const puppeteer = require("puppeteer");
var request = require("request");
var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDM4MjllZTM4NDRiNWI2OGQ1ZGFlMGYiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NDM4MmEwNzcwZmVjNmZjMDk3OGFhNjIifQ.b5FedFX3YmS84vpmeyCAsderSKVacdVDYXtNnKLOk88"

async function downloadFonts(page) {
  const idProfile = await getProfile(page);
  console.log(idProfile);
  var options = {
    method: "POST",
    url: "http://localhost:36912/browser/start-profile",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profileId: `${idProfile}`,
      sync: false,
    }),
  };

//Copy Font
  request(options, async function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);

    function wait(timeout) {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
    async function waitToCopy() {
      await wait(5000);
      console.log('5 seconds has passed');
    }
    
    await waitToCopy();
    
    const fs = require('fs-extra');

    async function copyFolder(sourcePath, destinationPath) {
      try {
        await fs.ensureDir(sourcePath); 
        console.log(sourcePath);
        await fs.copy(sourcePath, destinationPath);
        console.log('Folder copied successfully!');
      } catch (err) {
        console.error(err);
      }
    }

    async function copyFont() {
      const sourcePath = `C:/Users/Admin/AppData/Local/Temp/GoLogin/profiles`;
      const destinationPath = 'C:/Users/Admin/Desktop/FontGologin';
      
      console.log('Start');
      await copyFolder(sourcePath, destinationPath);
      console.log('Folder copying complete');
    }

    copyFont();

  });

//Download Profile
  var options = {
    method: "GET",
    // url: `https://api.gologin.com/browser/${idProfile}`,
    headers: {
      Authorization:
        `Bearer ${token}`,
      },
    };

    console.log("Profile ID: ", idProfile);
    options.url = `https://api.gologin.com/browser/${idProfile}`;
    async function getS3Path(page) {
      return new Promise(function(resolve,reject){
        request(options, function (error, response) {
          if (error) throw new Error(error);
          console.log(response.body);
          const responseBody = JSON.parse(response.body);
          const s3Path = responseBody.s3Path;
          resolve(s3Path);
        });
      }
    )} 
    const s3Path = await getS3Path(page);
    
    await page.waitForTimeout(5000);

    await page.goto(`HTTP://S3.EU-CENTRAL-1.AMAZONAWS.COM/gprofiles.gologin/${s3Path}`);
}

module.exports = downloadFonts;
