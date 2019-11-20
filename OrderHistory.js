const { Base64, base64encode, base64decode } = require('nodejs-base64');
const axios = require('axios')
const fetch = require('node-fetch');
const http = require("https");
var request = require("request");
const getToken = async () => {
    var request = require("request");   
    const encode = require('nodejs-base64-encode');    
    let apiClientSecret ='cfbdb775edffafdec67725406b918d1e'
    let apiClientId ='23fb97fa586c608f'
    const authHeader =  'Basic ' + encode.encode(apiClientId +':'+ apiClientSecret, 'base64')    
    const resp = await fetch('https://accounts.probit.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify({
            grant_type: 'client_credentials'
        })
    });
    if (!resp.ok) {
        throw new Error(resp.statusText);
    }  
    return resp.json();
};
const OrderGet= async() => {
    const token = (await getToken()).access_token;
    console.log('token') 
    console.log(token)
    let Bearer = 'Bearer '+ token
    var options = { method: 'GET',
    url: 'https://api.probit.com/api/exchange/v1/trade_history',
    qs: 
     { start_time: '2018-01-01T00:00:00.000Z',
       end_time: '2020-01-01T00:00:00.000Z',
       limit: '200',
       market_id: 'ETH-USDT' },
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       Cookie: '__cfduid=dcd18c202719592e4c8705340227992331574220899',
       'Accept-Encoding': 'gzip, deflate',
       Host: 'api.probit.com',
       'Postman-Token': '0b1ee423-662d-47d6-af90-386e5d85c38c,87ed5633-15b6-4d6e-b595-b280845d4476',
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': 'PostmanRuntime/7.19.0',
       Authorization: Bearer} };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
}
OrderGet()