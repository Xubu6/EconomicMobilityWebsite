const mongoose = require("mongoose");

// Represents a survey repsondent
let respondentSchema = new mongoose.Schema({

    // Identifier for the respondent
    respondentId: { type: String, required: true, lowercase: true, unique: true },
    experimentalGroup: { type: Number, min: 1, max: 4, require: true },

    // Last login
    lastLogin: {
        type: Date,
        default: Date.now
    },

    // Created on
    createdOn: {
        type: Date,
        default: Date.now
    },


    // ??
    // add a current ZipCode field, for the zipcode they are currently viewing / last searched, this will be updated by the api
    // create a viewed count field, so we can know when they have viewed 10 houses, this will be updated by the api
});

mongoose.model('Respondent', respondentSchema);