var constants = require('./constants'),
    request = require('./../tools/Request');
require("./../tools/Extenders");

var missingChildren = function()
{
    var parseResponseList = function (htmlDom) {
        if (htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN) < 0) { return []; }
        var data = htmlDom.substring(
                    htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN) + constants.SEPARATOR.ITEM.BEGIN.length,
                    htmlDom.indexOf(constants.SEPARATOR.ITEM.END));
        var ids = [];
        var currentId = data.substring(
                            data.indexOf(constants.SEPARATOR.ID.BEGIN) + constants.SEPARATOR.ID.BEGIN.length,
                            data.indexOf(constants.SEPARATOR.ID.BEGIN) + data.substr(data.indexOf(constants.SEPARATOR.ID.BEGIN)).indexOf(constants.SEPARATOR.ID.END)
                        );
        if (currentId) {
            ids.push(currentId * 1);
            var recurrent = parseResponseList(htmlDom.substring(htmlDom.indexOf(constants.SEPARATOR.ITEM.END) + constants.SEPARATOR.ITEM.END.length, htmlDom.length));
            if (recurrent.length > 0) {
                recurrent.forEach((elem) => {
                    ids.push(elem);
                })
            }
        }
        return ids;
    };

    var parseData = function (htmlDom) {
        if (htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN))
        {
            if (htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN) < 0) { return {}; }
            var image = htmlDom.substring(
                            htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + constants.SEPARATOR.IMG_DATA.BEGIN.length,
                            htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + htmlDom.substr(htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN)).indexOf(constants.SEPARATOR.IMG_DATA.END)
                        );
            var table = htmlDom.substring(
                            htmlDom.indexOf(constants.SEPARATOR.TABLE_DATA.BEGIN) + constants.SEPARATOR.TABLE_DATA.BEGIN.length,
                            htmlDom.indexOf(constants.SEPARATOR.TABLE_DATA.END)
                        );
            var name = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var from = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var photoAge = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var currentAge = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var birthday = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var location = table.substring(
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
                            table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
                        );
            var toReturn = {
                photo: image.trim(),
                name: name.trim(),
                missingFrom: from.trim(),
                age: {
                    photo: photoAge.replace("&ntilde;", "ñ").trim(),
                    current: currentAge.replace("&ntilde;", "ñ").trim()
                },
                birthday: birthday.trim(),
                location: location.replace("<br>&nbsp;", "").trim()
            };
            return toReturn;
        }
        return {};
    }

    var getIds = function()
    {
        return new Promise((resolve, reject)=>{
            var ids = [];
            constants.CATEGORIES.forEach((element,idx)=>{
                request(constants.URL, `${constants.RESOURCES.LIST}${element}`).then((res)=>{
                    var resParsed = parseResponseList(res);
                    resParsed.forEach((elem)=>{
                        ids.push(elem);
                    });
                    if(idx == 0)
                        resolve(ids.sortASC());
                });
            });
        });
    }

    var TakeSome = function () {
        return new Promise((resolve, reject) => {
            getIds().then((ids) => {
                request(constants.URL, `${constants.RESOURCES.DATA}${ids.takeSome()}`).then((res)=>{
                    var person = parseData(res);
                    if (person.name != null && person.name.toLowerCase().indexOf("encontrada")>-1)
                    {
                        return TakeSome().then((person)=>{
                            resolve(person)
                        });
                    }
                    resolve(person);
                });
            });
        })
    };

    return {
        takeSome: TakeSome
    }
};

module.exports = missingChildren();