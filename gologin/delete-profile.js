var request = require("request");
var options = {
  method: "DELETE",
  url: "https://api.gologin.com/browser/YOUR_PROFILE_ID",
  headers: {
    Authorization: "Bearer YOUR_API_TOKEN",
  },
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
