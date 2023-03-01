const express = require("express");
const bodyParser = require("body-parser");
const openBrowser = require(".");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const scenarios = [];

const steps = [
  {
    id: "a",
    name: "Đăng nhập facebook",
    functionName: "loginFacebook",
  },
  {
    id: "b",
    name: "Lướt newfeed",
    functionName: "scrollFacebook",
  },
];
app.get("/scenarios", (req, res) => {
  res.json({
    scenarios: scenarios,
  });
});

app.get("/steps", (req, res) => {
  res.json({
    steps: steps,
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


app.delete(`/delete-scenario/${ScenarioIds}`, (req, res) => {
  
  const scenarioId = parseInt(req.params.ScenarioIds);

  scenarios = scenarios.filter(scenario => scenario.id !== scenarioId);


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
