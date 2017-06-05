var express = require('express');
var app = express();
var fs = require('fs');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get('/search/:id', function (req, res) {
  fs.readFile(__dirname + '/' + 'users.json', 'utf-8', function (err, data) {
    console.log(req.params.id);
    res.end(data);
  })
})

var server = app.listen(8081, function () {
  console.log('访问地址为 http://localhost:8081');
});
