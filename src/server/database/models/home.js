const mongoose = require("mongoose");

// Schema for the homes in the databasse
let homeSchema = new mongoose.Schema({

    // Identifiers
    zip: { type: String, required: true },
    address: { type: String, required: true, index: { unique: true } },

    // Geo locators
    lat: {type: Number, required: true},
    lng: {type: Number, required: true},

    // Characteristics
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    sqft: { type: String, required: true },

    // Qualifiers
    photos: [{ type: String, required: true }],

    // Pricing metadata
    price: { type: Number, required: true},
    classification: { type: String, enum: ['poor', 'rich', 'medium'], required: true},

}, {
    collection: 'homes'
});

mongoose.model('Home', homeSchema);