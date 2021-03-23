const querystring = require("querystring");
const axios = require('axios');
const btoa = require('btoa');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  var formPayload = JSON.parse(event.body).payload;

  var nb = formPayload.number;
  var liveid = formPayload.data.live_id;
  var videoid = formPayload.data.video_id;
  var qui = formPayload.data.qui;
  var ou = formPayload.data.ou;
  var ip = formPayload.data.ip;
  var created_at = formPayload.created_at;

  // formPayload = btoa(JSON.stringify(formPayload));
  // console.log(formPayload);

  // var content = "eyJudW1iZXIiOiAiMSJ9";

  // var file = '{"number": "'+nb+'","data":{"liveid":"'+liveid+'","videoid":"'+videoid+'","qui":"'+qui+'","ou":"'+ou+'","ip":"'+ip+'"},"created_at":"'+created_at+'"}';

  var file = '{"number":"'+nb+'","created_at":"'+created_at+'"}';

  var content = btoa(file);

  const token = process.env.GITHUB_TOKEN;
  var date = new Date();
  date = date.toISOString();

  const url = `https://api.github.com/repos/odevillardi/destinationlive/contents/_data/every-live/live-${date}.json`;

  var data = "{\"branch\":\"main\",\"message\":\"New live\",\"content\":\""+content+"\"}";

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