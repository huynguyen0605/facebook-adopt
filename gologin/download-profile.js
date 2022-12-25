var request = require("request");
var options = {
  method: "GET",
  url: "https://api.gologin.com/browser/63a5a46e55992d6002e584db",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2E1YTNjNDdhNGNjMWZkZDI5ZjFhNzEiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2M2E1YTQ1MzA5NTIzMzFjNWRmOTIzMWYifQ.QAgB2WpRLlghDZ0QiHg3abSA_wjb9nbfVMltFZRkYuI",
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
