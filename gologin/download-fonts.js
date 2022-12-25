var request = require("request");
var options = {
  method: "POST",
  url: "http://localhost:36912/browser/start-profile",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    profileId: "63a5a46e55992d6002e584db",
    sync: false,
  }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
