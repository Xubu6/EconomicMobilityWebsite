const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Home = new Schema({
    zip: { type: Number, required: true },
    address: { type: String, required: true, index: { unique: true } },
    photoUrls: [{ type: String, required: false }],
    photos: [{ type: String, required: true }],
    price: { type: String, required: true},
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    sqft: { type: String, required: true }
});

module.exports = mongoose.model("Home", Home);
