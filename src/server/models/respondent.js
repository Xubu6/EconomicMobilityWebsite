const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* respondentId
* testGroup
* Array of ratings
*
* */

// Schema about the respondent
let Respondent = new Schema({
    respondentId: { type: String, required: true, index: { unique: true } },
    experimentalGroup: { type: Number, require: true }
    // add a current ZipCode field, for the zipcode they are currently viewing / last searched, this will be updated by the api
    // create a viewed count field, so we can know when they have viewed 10 houses, this will be updated by the api
});

Respondent.pre("validate", function(next) {
    this.respondentId = this.respondentId.replace(/<(?:.|\n)*?>/gm, "");
    this.respondentId = this.respondentId.toLowerCase();
    next();
});

module.exports = mongoose.model("Respondent", Respondent);
