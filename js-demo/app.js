const NodeRSA = require('node-rsa');
const request = require('request');

const private_key = "xxx";
const apiKey = "xxx";
const apiSecret = "xxx";
const key = new NodeRSA('-----BEGIN PRIVATE KEY-----\n' + private_key + '\n-----END PRIVATE KEY-----');


function encrypt(payload) {
    if(payload) {
        return key.encryptPrivate(payload, 'base64');
    } else {
        console.log(key.encryptPrivate(apiKey + ':' + apiSecret + ':' + new Date().getTime(), 'base64'));
        return key.encryptPrivate(apiKey + ':' + apiSecret + ':' + new Date().getTime(), 'base64');
    }
}

/**
 * Get access token
 */
var tokenRequest = {
    url: 'https://openapi.bitmart.com/v2/token',
    method: 'POST',
    form: {
        'grant_type': 'client_credentials', 
        'client_id': apiKey,
        'client_secret': encrypt()
    }
};

function getAccessToken(tokenRequest) {
    request(tokenRequest, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log("body: " + body);
            return JSON.parse(body).access_token;
        }
        console.log("error: " + error + "; response status: " + response.statusCode + "; body: " + body);
        return null;
    });
}

getAccessToken(tokenRequest);


