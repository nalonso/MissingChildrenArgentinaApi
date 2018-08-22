var request = require("./../controllers/tools/Request"),
    mca = require("./../controllers/ar/missingChildren");
require('./../controllers/tools/Extenders');

var appRouter = function (app) {
    app.get("/", function (req, response) {
        mca.takeSome().then((res)=>{
            response.status(200).send(res);
        });
    });
}

module.exports = appRouter;