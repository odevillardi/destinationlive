var FormData = require('form-data');
const fetch = require('node-fetch');
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

  const token = process.env.GITLAB_TOKEN;
  var date = new Date();
  date = date.toISOString();

  const url = `https://gitlab.com/api/v4/projects/24861509/repository/files/_data%2every-live%2live.json?access_token=${token}`;

  var data = new FormData();
  data.append("branch", "master");
  data.append("commit_message", "Test depuis netlify function");
  data.append("content", "Test");

  var config = {
    method: 'post',
    url: url,
    headers: {"Content-Type": "application/json"},
    data : data
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
