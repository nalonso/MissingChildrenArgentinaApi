var http = require("http"),
    https = require('https'),
    constants = require("./constants");

var request = function (url, method){
    var options = {
        host: "www.missingchildren.org.ar",
        path: "/listado.php?categoria=" + category,
        method: method || constants.METHOD.GET
    };
    var request = http.request(options, function (res) {
        var data = "";
        res.on("data", function (chunk) {
            data += chunk;
        });
        res.on("end", function () {
            callback(data);
        });
    });
    request.on("error", function (e) {
        console.log(e.message);
    });
    request.end();
}


module.exports = request;