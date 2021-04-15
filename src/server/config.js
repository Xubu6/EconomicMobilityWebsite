/**
 * Created on 4/11/21 by jovialis (Dylan Hanson)
 **/

module.exports = {

    PRODUCTION: process.env.NODE_ENV === 'production',
    DEVELOPMENT: process.env.NODE_ENV !== 'production',

    MONGODB_URI: process.env.MONGODB_URI,

    SESSION_SECRET: process.env.SESSION_SECRET,

    PORT: Number(process.env.PORT) || 8080,

};