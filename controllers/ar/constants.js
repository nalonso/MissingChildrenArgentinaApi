var url = 'www.missingchildren.org.ar';
const CONSTANTS = {
    PHONE_NUMBER: '0800-333-5500',
    E_MAIL: 'info@missingchildren.org.ar',
    URL: url,
    RESOURCES: {
        LIST: `${url}/listado.php?categoria=`,
        DATA: `${url}/datos.php?action=view&id=`,
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
    }
};
module.exports = CONSTANTS;