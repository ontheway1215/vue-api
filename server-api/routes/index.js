var express = require('express');
var app = express();
var router = express.Router();
var http = require('http');
var crypto = require('crypto');

var protocol = 'http://';
var host = 'open-api.biaoqingmm.com';
var searchUrl = '/open-api/emojis/net/search';
var trendingUrl = '/open-api/trending';
var hotUrl = '/open-api/netword/hot';
var owUpdateTimeUrl = '/open-api/netword/ow/updatetime';

var appId = 'd3c73b7bd2f24e4abcfa689f4361b310';
var fs = 'medium';
var partner = 'bqss_web';

var trendingJson = {};
var hotWordJson = {};

router.all('/search/:id/:page', function (req, res, next) {
  var params = {
    app_id: appId,
    fs: fs,
    partner: partner,
    timestamp: new Date().getTime()
  };
  params.q = req.params.id;
  params.p = req.params.page || 1;
  params.size = req.query.size;
  var queryStr = stringify(params);
  queryStr = decodeURIComponent(queryStr);
  var signature = md5Encrypt(protocol + host + searchUrl + queryStr);
  params.signature = signature;
  queryStr = stringify(params);
  var options = {
    hostname: host,
    path: searchUrl + '?' + queryStr,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  };
  sendRequest(options).then(function (data) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
  }).catch(function (err) {
  });
});



router.all('/trending', function (req, res, next) {
  var params = {
    app_id: appId,
    fs: fs,
    partner: partner,
    timestamp: new Date().getTime()
  };
  var options = {
    hostname: host,
    path: owUpdateTimeUrl,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  };
  sendRequest(options).then(function (data) {
    data = JSON.parse(data);
    params.p = req.query.p;
    params.size = req.query.size;
    var queryStr = stringify(params);
    queryStr = decodeURIComponent(queryStr);
    var signature = md5Encrypt(protocol + host + trendingUrl + queryStr);
    params.signature = signature;
    queryStr = stringify(params);
    var options = {
      hostname: host,
      path: trendingUrl + '?' + queryStr,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    };
    sendRequest(options).then(function (data) {
      trendingJson = data;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(data);
    }).catch(function (err) {
      res.send(err);
    });
  }).catch(function (err) {
    res.send(err);
  });
});



router.all('/hot', function (req, res, next) {
  var params = {
    app_id: appId,
    fs: fs,
    partner: partner,
    timestamp: new Date().getTime()
  };
  var options = {
    hostname: host,
    path: owUpdateTimeUrl,
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    }
  };
  sendRequest(options).then(function (data) {
    data = JSON.parse(data);
    var queryStr = stringify(params);
    queryStr = decodeURIComponent(queryStr);
    var signature = md5Encrypt(protocol + host + hotUrl + queryStr);
    params.signature = signature;
    queryStr = stringify(params);
    var options = {
      hostname: host,
      path: hotUrl + '?' + queryStr,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      }
    };
    sendRequest(options).then(function (data) {
      hotWordJson = data;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(data);
    }).catch(function (err) {
      res.send(err);
    });
  }).catch(function (err) {
    res.send(err);
  });
});



function stringify(object) {
  var keys = Object.keys(object).sort();
  var string = '';
  for (var i = 0; i < keys.length; i++) {
    if (object[keys[i]] != undefined)
      string += keys[i] + '=' + encodeURIComponent(object[keys[i]]) + '&';
  }
  return string.substring(0, string.length - 1);
}



function sendRequest(options) {
  return new Promise(function (resolve, reject) {
    var req = http.request(options, function (res) {
      var data = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        if (res.statusCode == 200) {
          resolve(data);
        } else {
          reject('{"error_code":1,"message":"server response error"}');
        }
      });
    });
    req.on('error', function (err) {
      reject(err);
    });
    req.end();
  });
}


function md5Encrypt(encryptString) {
  var hasher = crypto.createHash("md5");
  hasher.update(encryptString);
  return hasher.digest('hex').toUpperCase();
}


module.exports = router;
