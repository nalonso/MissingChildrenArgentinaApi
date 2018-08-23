var url = 'www.missingchildren.org.ar';
const CONSTANTS = {
    PHONE_NUMBER: '0800-333-5500',
    E_MAIL: 'info@missingchildren.org.ar',
    URL: url,
    RESOURCES: {
        LIST: `/listado.php?categoria=`,
        DATA: `/datos.php?action=view&id=`,
        POSTER: `${url}/poster?id=`,
        IMAGES: `${url}/imagench/`
    },
    CATEGORIES: [
        'perdidos',
        'mayores',
        'buscan'
    ],
    BANNER: {
        PATH: `${url}/images/lgp.jpg`,
        WIDTH: 661,
        HEIGHT: 137
    },
    SEPARATOR: {
        ITEM: {
            BEGIN: '<table',
            END: '</table>'
        },
        ID: {
            BEGIN: 'datos.php?action=view&id=',
            END: '">'
        },
        TABLE7_DATA: {
            BEGIN: 'id="table7"',
            END: '</table>'
        },
        TABLE11_DATA: {
            BEGIN: 'id="table11"',
            END: '</table>'
        },
        TABLE_TD: {
            BEGIN: '<td',
            END: '</td>'
        },
        IMG_DATA: {
            BEGIN: 'src="imagench/',
            END: '" width="'
        }
    }
};

module.exports = CONSTANTS;