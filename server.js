const express = require("express");
const bodyParser = require("body-parser");
const openBrowser = require(".");
const cors = require("cors");
const {google} = require('googleapis');

// Load credentials from JSON key file
const creds = require('E://Workspace//Tool//facebook-adopt//credentialskey.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let scenarios = [];

const steps = [];

// Create a new JWT client using the credentials
const authClient = new google.auth.JWT(
  creds.client_email,
  null,
  creds.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// Authorize the client
authClient.authorize(function(err) {
  if (err) {
    console.log(err);
    return;
  }

  // Create an instance of the Sheets API client with the authorized client
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  // Read from scenario sheet
  sheets.spreadsheets.values.get({
    spreadsheetId: '1zlivcZ2xPrKVgO8l8Zq6iWhv21DWK9fnVPvgS6W3xgk',
    range: 'Sheet1!A1:B2',
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const rows = res.data.values;
    console.log(`First two rows of data:`);
    console.log(rows);
  });

  // Read from Steps sheet
  sheets.spreadsheets.values.get({
    spreadsheetId: '1zlivcZ2xPrKVgO8l8Zq6iWhv21DWK9fnVPvgS6W3xgk',
    range: 'Steps!A1:C10',
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    const rows = res.data.values;
    console.log(`First two rows of Steps data:`);
    console.log(rows);
  });

  // Write to a sheet
  sheets.spreadsheets.values.update({
    spreadsheetId: '1zlivcZ2xPrKVgO8l8Zq6iWhv21DWK9fnVPvgS6W3xgk',
    range: 'Sheet1!A1:B2',
    valueInputOption: 'RAW',
    resource: {
      values: [
        ['New value A1', 'New value B1'],
        ['New value A2', 'New value B2'],
      ],
    },
  }, (err, res) => {
    if (err) return console.log(`The API returned an error: ${err}`);
    console.log(`Updated ${res.data.updatedCells} cells.`);
  });
});

app.get("/scenarios", (req, res) => {
  res.json({
    scenarios: scenarios,
  });
});

app.get("/steps", (req, res) => {
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  sheets.spreadsheets.values.get({
    spreadsheetId: '1zlivcZ2xPrKVgO8l8Zq6iWhv21DWK9fnVPvgS6W3xgk',
    range: 'Steps!A1:C', // Assuming the data starts at row 2 and has three columns (id, name, functionName)
  }, (err, response) => {
    if (err) return console.log(`The API returned an error: ${err}`);

    const rows = response.data.values;
    const newSteps = rows.map(row => {
      return {
        id: row[0],
        name: row[1],
        functionName: row[2]
      };
    });

    steps.push(...newSteps); // Push the new steps to the existing array

    res.json({
      steps: steps,
    });
  });
});

app.post("/create-scenario", (req, res) => {
  const { stepIds } = req.body;

  const newScenario = [
    {
      id: `${scenarios.length}`,
      stepIds,
    },
  ];

  scenarios.push(newScenario[0]);

  res.json({
    status: "OK",
  });
});

app.delete(`/delete-scenario/:scenarioIds`, (req, res) => {
  const scenarioId = parseInt(req.params.scenarioIds);

  scenarios = scenarios.filter((scenario) => scenario.id !== scenarioId);

  res.json({
    status: "OK",
  });
});

app.get("/get-scenario", (req, res) => {
  res.json({
    scenarios: scenarios,
  });
});

const runScript = [];

app.post("/run-scenario", async (req, res) => {
  const { ScenarioId } = req.body;
  const chosenScenario = [{ ScenarioId }];
  // runScript = [...runScript, ...chosenScenario];
  runScript.push(chosenScenario);
  // if (chosenScenario.name == scenarios[0].name){
  //   runScript.push(chosenScenario);
  // }
  await openBrowser();

  res.json({
    status: "Succesfully",
    runScript: runScript,
  });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});



// const fs = require('fs').promises;
// const path = require('path');
// const process = require('process');
// const {authenticate} = require('@google-cloud/local-auth');





