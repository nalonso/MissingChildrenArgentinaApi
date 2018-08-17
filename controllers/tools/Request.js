var http = require('http');

var request = function (category, callback){
    var options = {
        host: "www.missingchildren.org.ar",
        path: "/listado.php?categoria=" + category
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