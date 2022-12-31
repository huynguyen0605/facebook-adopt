const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const scenarios = [];

app.post("/create-scenario", (req, res) => {
  const { steps0, steps1 } = req.body;

  console.log(steps0, steps1);

  const newScenario = {
    steps: [steps0, steps1],
  };

  scenarios.push({
    [`scenario-${scenarios.length}`]: newScenario,
  });

  /**
   * {
   * scenario-0: {
   *  steps: ["đăng nhập facebook", "xem phim"]
   * }
   * }
   */

  res.json({
    code: "fail",
  });
});

app.get("/get-scenario", (req, res) => {
  res.json({
    scenarios: scenarios,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
