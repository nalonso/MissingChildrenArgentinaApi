var http = require("http"),
    https = require('https'),
    constants = require("./constants");

var request = function (host, resource, method){
    var options = {
        host: host || "" ,
        path: resource || "/",
        method: method || constants.METHOD.GET
    };
    return new Promise((resolve, reject)=>{
        var request = http.request(options, function (res) {
            var data = "";
            res.on("data", function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                resolve(data);
            });
        });
        request.on("error", function (e) {
            reject(e.message);
        });
        request.end();
    });
}


module.exports = request;