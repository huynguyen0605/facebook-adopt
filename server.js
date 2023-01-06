const express = require("express");
const bodyParser = require("body-parser");
const logInFacebook = require("./steps/sign-up/log-in-facebook");

const app = express();
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
  const { name, steps } = req.body;

  const newScenario = [
    {
      id: `scenario${scenarios.length}`,
      name,
      steps,
    },
  ];
  // const listScenarios = scenarios.concat(newScenario);

  // console.log(steps0, steps1);
  scenarios.push(newScenario);

  res.json({
    status: "OK",
  });

  /**
   * {
   * scenario-0: {
   *  steps: ["đăng nhập facebook", "xem phim"]
   * }
   * }
   */
});

app.get("/get-scenario", (req, res) => {
  res.json({
    scenarios: scenarios,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
