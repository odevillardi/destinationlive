const querystring = require("querystring");
const axios = require('axios');
const btoa = require('btoa');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const params = querystring.parse(event.body);
  const formPayload = JSON.stringify(params.payload);
  formPayload = btoa(formPayload);

  console.log(formPayload);

  const token = process.env.GITHUB_TOKEN;
  var date = new Date();
  date = date.toISOString();

  const url = `https://api.github.com/repos/odevillardi/destinationlive/contents/_data/every-live/live-${date}.json`;

  var data = "{\"branch\":\"main\",\"message\":\"test depuis postman\",\"content\":formPayload}";

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
