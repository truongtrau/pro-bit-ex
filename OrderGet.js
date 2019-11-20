const { Base64, base64encode, base64decode } = require('nodejs-base64');
const axios = require('axios')
const fetch = require('node-fetch');
const http = require("https");
var request = require("request");
const getToken = async () => {
    var request = require("request");   
    const encode = require('nodejs-base64-encode');    
    let apiClientSecret ='xx'
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
    url: 'https://api.probit.com/api/exchange/v1/open_order',
    headers: 
     {   
       Host: 'api.probit.com',              
       'Content-Type': 'application/json',
       Authorization: Bearer } };  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
  });  
}
OrderGet()