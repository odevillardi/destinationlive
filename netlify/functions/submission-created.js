const querystring = require("querystring");
const axios = require('axios');
const btoa = require('btoa');

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  var formPayload = JSON.parse(event.body).payload;

  console.log(formPayload);

  if (formPayload.data.liveid) {
    var nb = formPayload.number;
    var liveid = JSON.parse(formPayload.data.liveid)[0];
    var videoid = JSON.parse(formPayload.data.videoid)[0];
    var qui = encodeURI(formPayload.data.qui);
    var ou = encodeURI(formPayload.data.ou);
    var ip = formPayload.data.ip;
    var created_at = formPayload.created_at;

    var filemd = '---\nlayout: live\ntitle: "'+qui+' en live &agrave; '+ou+'"\nnumber: '+nb+'\nliveid: '+liveid+'\nvideoid: '+videoid+'\nqui: '+qui+'\nou: '+ou+'\nip: '+ip+'\ncreated_at: '+created_at+'\npermalink: '+nb+'-'+liveid+'\n---';

    var content = btoa(filemd);

    const token = process.env.GITHUB_TOKEN;
    var date = new Date();
    date = date.toISOString();

    const url = `https://api.github.com/repos/odevillardi/destinationlive/contents/_lives/live-${date}.md`;

    var data = "{\"branch\":\"main\",\"message\":\"New live\",\"content\":\""+content+"\"}";

    var config = {
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token '+token,
        'Content-Type': 'text/plain',
        'Accept': 'application/vnd.github.v3+json'
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
  }
};
