const mongoose = require("mongoose");

// Represents someone rating a neighborhood
let ratingSchema = new mongoose.Schema({

    // Identification
    respondent: { type: mongoose.Types.ObjectId, ref: 'Respondent', required: true, unique: true },
    homeSample: {type: mongoose.Types.ObjectId, ref: 'HomeSample', required: true, unique: true},

    // Ranked addresses
    bestAddress1: {type: mongoose.Types.ObjectId, ref: "Home", required: true}, // Best
    bestAddress2: {type: mongoose.Types.ObjectId, ref: "Home", required: true}, // Second best

    worstAddress2: {type: mongoose.Types.ObjectId, ref: "Home", required: true}, // Second worst
    worstAddress1: {type: mongoose.Types.ObjectId, ref: "Home", required: true}, // Worst

});

mongoose.model('Rating', ratingSchema);