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

const getBalance= async() => {
    const token = (await getToken()).access_token;
    console.log('token') 
    console.log(token)
    let Bearer = 'Bearer '+ token
    var options = { method: 'GET',
    url: 'https://api.probit.com/api/exchange/v1/balance',
    headers: 
     { 'cache-control': 'no-cache',
       Connection: 'keep-alive',
       Cookie: '__cfduid=dcd18c202719592e4c8705340227992331574220899',       
       Host: 'api.probit.com',
       'Postman-Token': 'b4a3e09f-4c43-40c1-ae6e-6e94d796b967,8c76596c-099b-4d70-a7e6-3e3f0cae9126',
       'Cache-Control': 'no-cache',
       Accept: '*/*',
       'User-Agent': 'PostmanRuntime/7.19.0',
       Authorization: Bearer } };  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log( JSON.stringify(body));
  });  
}
getBalance()
