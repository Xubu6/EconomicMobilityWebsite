/**
 * Created on 4/12/21 by jovialis (Dylan Hanson)
 **/

const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(res => {

    res.set('useNewUrlParser', true);

    console.log(`MongoDB connected.`);

}).catch(err => {
    console.log("Connection ERROR: " + err);
    process.exit(-1);
})

require('./models/home');
require('./models/rating');
require('./models/respondent');
require('./models/homeSample');