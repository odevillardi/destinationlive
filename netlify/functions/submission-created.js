const querystring = require("querystring");
const axios = require('axios');
const btoa = require('btoa');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  var formPayload = JSON.parse(event.body).payload;

  // var nb = btoa(formPayload.number);
  // var live-id = btoa(formPayload.data.live-id);

  // formPayload = btoa(JSON.stringify(formPayload));
  // console.log(formPayload);

  const token = process.env.GITHUB_TOKEN;
  var date = new Date();
  date = date.toISOString();

  const url = `https://api.github.com/repos/odevillardi/destinationlive/contents/_data/every-live/live-${date}.json`;

  var data = "{\"branch\":\"main\",\"message\":\"New live\",\"content\":\"{\"number\":\"1\"}\"}";

  var config = {
    method: 'PUT',
    url: url,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token '+token,
      'Content-Type': 'text/plain'
    },
    data: data
  };

  await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
};
