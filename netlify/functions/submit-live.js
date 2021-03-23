// var FormData = require('form-data');
// const fetch = require('node-fetch');
const querystring = require("querystring");
const axios = require('axios');

exports.handler = async (event, context) => {
  // if (event.httpMethod !== "POST") {
  //   return { statusCode: 405, body: "Method Not Allowed" };
  // }

  // const params = querystring.parse(event.body);
  // const artiste = params.qui;
  // const lieu = params.ou;
  // const formPayload = params.payload;

  const token = process.env.GITHUB_TOKEN;
  var date = new Date();
  date = date.toISOString();

  const url = `https://api.github.com/repos/odevillardi/destinationlive/contents/_data/every-live/live-${date}.json`;

  var data = "{\"branch\":\"main\",\"message\":\"test depuis postman\",\"content\":\"dGVzdA==\"}";

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

  // var requestOptions = {
  //   method: 'POST',
  //   headers: {"Content-Type": "application/json"},
  //   body: data,
  //   redirect: 'follow',
  // };
  //
  // return fetch(url, requestOptions)
  //   .then((response) => response.text())
  //   .then((data) => ({
  //     statusCode: 200,
  //     body: "Ok",
  //   }))
  //   .catch((error) => ({
  //     statusCode: 422,
  //     body: `Oops! Something went wrong. ${error}`,
  //   }));
};
