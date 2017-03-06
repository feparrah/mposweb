const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const https = require('https');
const http = require('http');
const queryString = require('querystring');

const app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'webapp')));


app.route('/api/token')
    .post(function(req, res) {
        var payload = queryString.stringify(req.body);
        var options = {
            rejectUnauthorized: false,
            host: 'support.netcom.com.co',
            port: 9544,
            path: '/oauth2/token',
            method: 'POST',
            headers: {
                'Content-Type': req.get('Content-Type'),
                'Content-Length': payload.length
            }
        };
        var request = https.request(options, function(response) {
            response.on('data', function(data) {
                res.json(JSON.parse(data.toString()));
            });
        });
        request.write(payload);
        request.end();


    });

app.route('/api/users/:userId')
    .get(function(req, res) {
        var options = {
            rejectUnauthorized:false,
            host : 'support.netcom.com.co',
            port : 8343,
            path : '/netcom/merchant/api/users/' + req.params.userId,
            method : 'GET',
            headers : {
                'Content-Type' : 'text/html',
                'Authorization' : req.get('Authorization')
            }
        };

        var request = https.request(options, function(response) {
            response.on('data', function(bufferData) {
                res.json(JSON.parse(bufferData.toString()));
            });
            response.on('error', function(error){
                console.log(error);
                res.json(error);
            });
        });

        request.on('error', function(error){
            console.log(error);
            res.json(error);
        });
        request.end();
    });
app.route('/api/sessions')
    .post(function(req, res) {
        var options = {
            rejectUnauthorized:false,
            host : 'support.netcom.com.co',
            port : 8343,
            path : '/netcom/merchant/api/users/sessions',
            method : 'POST',
            headers : {
                'Content-Type' : req.get('Content-Type'),
                'Authorization' : req.get('Authorization')
            }
        };
        var request = https.request(options, function(response) {
           response.on('data', function(bufferData){
               res.json(JSON.parse(bufferData.toString()));
           });
           response.on('error', function(error) {
              console.log(error);
           });
        });
        request.on('error', function(error){
            console.log(error);
        });
        request.write(JSON.stringify(req.body));
        request.end();
    });

app.route('/api/:userid/passwords')
    .post(function(req, res){
        var options = {
            rejectUnauthorized:false,
            host : 'support.netcom.com.co',
            port : 8343,
            path : '/netcom/merchant/api/users/'+ req.params.userid +'/passwords',
            method : 'POST',
            headers : {
                'Content-Type' : req.get('Content-Type'),
                'Authorization' : req.get('Authorization')
            }
        };

        var request = https.request(options, function(response) {
            response.on('data', function(bufferData){
                res.json(JSON.parse(bufferData.toString()));
            });
            response.on('error', function(error) {
                console.log(error);
            });
        });

        request.write(JSON.stringify(req.body));
        request.end();


    });

app.route('/api/:userid/sessions')
    .delete(function(req , res) {
        var options = {
            rejectUnauthorized:false,
            host : 'support.netcom.com.co',
            port : 8343,
            path : '/netcom/merchant/api/users/'+ req.params.userid +'/sessions',
            method : 'DELETE',
            headers : {
                'Content-Type' : 'text/html',
                'Authorization' : req.get('Authorization')
            }
        };

        var request = https.request(options, function(response) {
           response.on('data', function(bufferData) {
                res.json(JSON.parse(bufferData.toString()));
           });
           response.on('error', function(error){
               console.log(error);
               res.json(error);
           });
        });

        request.on('error', function(error){
            console.log(error);
            res.json(error);
        });
        request.end();
    });

app.listen(3000, function() {
    console.log('Server started on port 3000');
});