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

    var parseData = function (htmlDom, idPerson) {
        if (htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN))
        {
            var table11 = htmlDom.indexOf(constants.SEPARATOR.TABLE11_DATA.BEGIN) > -1;
            if (htmlDom.indexOf(constants.SEPARATOR.ITEM.BEGIN) < 0) { return {}; }
            var image = htmlDom.substring(
                            htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + constants.SEPARATOR.IMG_DATA.BEGIN.length,
                            htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + htmlDom.substr(htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN)).indexOf(constants.SEPARATOR.IMG_DATA.END)
                        );
            var imageProjected = '';
            if(table11)
            {
                var secondImg = htmlDom.sub(
                                    htmlDom.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + constants.SEPARATOR.IMG_DATA.BEGIN.length
                                );
                imageProjected = secondImg.substring(
                                    secondImg.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + constants.SEPARATOR.IMG_DATA.BEGIN.length,
                                    secondImg.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN) + secondImg.substr(secondImg.indexOf(constants.SEPARATOR.IMG_DATA.BEGIN)).indexOf(constants.SEPARATOR.IMG_DATA.END)
                                );
            }
            var tableBegin = constants.SEPARATOR.TABLE7_DATA.BEGIN,
                tableEnd = constants.SEPARATOR.TABLE7_DATA.END;
            if (table11)
            {
                tableBegin = constants.SEPARATOR.TABLE11_DATA.BEGIN;
                tableEnd = constants.SEPARATOR.TABLE11_DATA.END;
            }
            var table = htmlDom.substring(
                            htmlDom.indexOf(tableBegin) + tableBegin.length,
                            htmlDom.indexOf(tableEnd)
                        );
            var name = getDataFromTd(table);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var from = getDataFromTd(table);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var photoAge = getDataFromTd(table);
            var projectedAge = '';
            if(table11)
            {
                table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
                table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
                projectedAge = getDataFromTd(table);
            }
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var currentAge = getDataFromTd(table);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var birthday = getDataFromTd(table);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            table = table.substr(table.indexOf(constants.SEPARATOR.TABLE_TD.END) + constants.SEPARATOR.TABLE_TD.END.length);
            var location = getDataFromTd(table);
            var replace = {
                find: [
                    ' de ',
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                    '&nbsp;',
                    '  ',
                    '<br>',
                    '&ntilde;',
                    'años',
                    'a�os'
                ],
                to: [
                    '/',
                    '01',
                    '02',
                    '03',
                    '04',
                    '05',
                    '06',
                    '07',
                    '08',
                    '09',
                    '10',
                    '11',
                    '12',
                    '',
                    ' ',
                    '',
                    'ñ',
                    '',
                    ''
                ]
            };
            var toReturn = {
                id: idPerson,
                photo: {
                    last: image.trim(),
                    projected: imageProjected.trim()
                },
                name: name.replaceAll(replace.find, replace.to).trim(),
                missingFrom: from.replaceAll(replace.find, replace.to).trim(),
                age: {
                    photo: photoAge.replaceAll(replace.find, replace.to).trim(),
                    current: currentAge.replaceAll(replace.find, replace.to).trim(),
                    projected: projectedAge.replaceAll(replace.find, replace.to).trim()
                },
                birthday: birthday.replaceAll(replace.find, replace.to).trim(),
                location: location.replaceAll(replace.find, replace.to).trim()
            };
            return toReturn;
        }
        return {};
    }

    var getDataFromTd = function (tableDom) {
        return tableDom.substring(
            tableDom.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + tableDom.substr(tableDom.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf('>') + 1,
            tableDom.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN) + tableDom.substr(tableDom.indexOf(constants.SEPARATOR.TABLE_TD.BEGIN)).indexOf(constants.SEPARATOR.TABLE_TD.END)
        );
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
                var idToSend = ids.takeSome();
                request(constants.URL, `${constants.RESOURCES.DATA}${idToSend}`).then((res)=>{
                    var person = parseData(res, idToSend);
                    if (person.name != null && person.name.toLowerCase().indexOf("encontrad")>-1)
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