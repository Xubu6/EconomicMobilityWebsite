/**
 * Created on 4/14/21 by jovialis (Dylan Hanson)
 **/

const mongoose = require('mongoose');

// Represents the homes selected for a given user to review.
const homeSampleSchema = new mongoose.Schema({

    zip: { type: String, required: true },

    respondent: {
        type: mongoose.Types.ObjectId,
        ref: 'Respondent',
        required: true
    },

    homes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Home',
        required: true,
        length: 10
    }],

    timestamp: {
        type: Date,
        default: Date.now
    }

}, {
    collection: 'homeSamples'
});

mongoose.model('HomeSample', homeSampleSchema);