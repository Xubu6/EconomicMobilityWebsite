const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* home objectID
* rating1 (1-5)
* rating2 (1-5)
* rating3 (1-5)
* */

// This was the schema for the rating system Professor Kim wanted. I don't think
// it's needed anymore, but check with her
let Rating = new Schema({
    respondent: { type: Schema.ObjectId, required: true, ref: "Respondent", index: true, unique: false},
    home: { type: Schema.ObjectId, required: true, ref: "Home", index: true, unique: false },
    rating1: { type: Number, required: true },
    rating2: { type: Number, required: true },
    rating3: { type: Number, required: true }
});

Rating.index({respondent: 1, home: 1}, {unique: true});

module.exports = mongoose.model("Rating", Rating);
