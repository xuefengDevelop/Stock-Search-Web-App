var express = require('express');
var cors = require('cors');
var parseString = require('xml2js').parseString;
var app = express();
const http = require("http");
var https = require('https');


app.use(cors());

app.get('/auto/:name', function(req, res,next) {
    var url ="http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input="+req.params.name;
    setTimeout(myreqs,500);
    function myreqs() {
        http.get(url, function(rest){
        var body = '';
        rest.on('data', function(response){
            body += response;
        });
        rest.on('end', function(){
            try{
            var fbResponse = JSON.parse(body);
            res.send(fbResponse);}
            catch(e){
                res.send("");
            }
        });
        }).on('error', function(e){
            console.log("Got an error: ", e);
        });}
});
app.get('/price/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+req.params.name+"&outputsize=full&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/historprice/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+req.params.name+"&outputsize=full&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
           res.send(""); 
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/pricetable/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+req.params.name+"&outputsize=compact&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);
        }
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/sma/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=SMA&symbol="+req.params.name+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
             res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/ema/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=EMA&symbol="+req.params.name + "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/stoch/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=STOCH&symbol="+req.params.name+ "&interval=daily&slowkmatype=1&slowdmatype=1&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/rsi/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=RSI&symbol="+req.params.name+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/adx/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=ADX&symbol="+req.params.name+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/cci/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=CCI&symbol="+req.params.name+ "&interval=daily&time_period=10&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/bbands/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=BBANDS&symbol="+req.params.name+ "&interval=daily&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=OBP218MBW0GD75W2";
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
            res.send("");
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/macd/:name', function(req, res,next) {
    var url ="https://www.alphavantage.co/query?function=MACD&symbol="+ req.params.name+ "&interval=daily&time_period=10&series_type=close&apikey=OBP218MBW0GD75W2"
    https.get(url, function(rest){
    var body = '';
    rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        try{
        var fbResponse = JSON.parse(body);
        res.send(fbResponse);}
        catch(e){
           res.send(""); 
        }
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});
});
app.get('/news/:name', function(req, res,next) {
    var url ="https://seekingalpha.com/api/sa/combined/"+ req.params.name.toUpperCase()+".xml";
    console.log(url);
    https.get(url, function(rest){
        var body = '';
        rest.on('data', function(response){
        body += response;
    });
    rest.on('end', function(){
        parseString(body, function (err, result) {
            res.send(result);
        });
    });
}).on('error', function(e){
      console.log("Got an error: ", e.message);
});
});

app.listen(8081);
console.log('Listening on port 8081...');
