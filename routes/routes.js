var request = require("./../controllers/tools/Request");

var appRouter = function (app) {
    app.get("/", function (req, res) {
        var ids = [];
        request("perdidos", function (data) {
            //console.log(data.indexOf("<table"));
            //console.log(data.substr(lastIndexOf(data, "</table>"),8));
            //console.log(data.substring(data.indexOf("<table"), lastIndexOf(data, "</table>") + 8));
            var currents = parseTable(data.substring(data.indexOf("<table") + 6, lastIndexOf(data, "</table>")));;
            currents.forEach((elem)=>{ ids.push(elem) });

            request("mayores", function (data) {
                var currents = parseTable(data.substring(data.indexOf("<table") + 6, lastIndexOf(data, "</table>")));;
                currents.forEach((elem) => { ids.push(elem) });
                ids.sort(function compareNumbers(a, b) {
                    return a - b;
                });
                console.log(ids);
                res.status(200).send(data);
            });
        });
    });
}

function parseTable (string)
{
    if( string.indexOf("<table") < 0) {return [];}
    var data = string.substring(string.indexOf("<table") + 6 , string.indexOf("</table>"));
    var ids = [];
    var currentId = data.substring(data.indexOf('datos.php?action=view&id=') + 25, data.indexOf('datos.php?') + data.substr(data.indexOf('datos.php?')).indexOf('">'));
    if(currentId)
    {
        ids.push(currentId * 1);
        var recurrent = parseTable(string.substring(string.indexOf("</table>")+8, string.length));
        if(recurrent.length > 0){
            recurrent.forEach((elem) => {
                ids.push(elem);
            })
        }
    }
    return ids;
}

function lastIndexOf (string, word)
{
    var idx = invertir(string).indexOf(invertir(word));
    return string.length - ( idx + word.length );
}

function invertir(cadena) {
    var x = cadena.length;
    var cadenaInvertida = "";

    while (x >= 0) {
        cadenaInvertida = cadenaInvertida + cadena.charAt(x);
        x--;
    }
    return cadenaInvertida;
}

module.exports = appRouter;