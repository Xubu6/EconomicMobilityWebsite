const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* respondentId
* testGroup
* Array of ratings
*
* */

let Respondent = new Schema({
    respondentId: { type: String, required: true, index: { unique: true } },
    experimentalGroup: { type: Number, require: true }
});

Respondent.pre("validate", function(next) {
    this.respondentId = this.respondentId.replace(/<(?:.|\n)*?>/gm, "");
    this.respondentId = this.respondentId.toLowerCase();
    next();
});

module.exports = mongoose.model("Respondent", Respondent);
