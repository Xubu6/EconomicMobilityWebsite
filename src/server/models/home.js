const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
req.body.respondentId.includes("danielryan")
            || req.body.respondentId.includes("eunjikim")
            || req.body.respondentId.includes("sarakirshbuam")
            || req.body.respondentId.includes("jamestang")
            || req.body.respondentId.includes("ancherli")
            || req.body.respondentId.includes("thomasmallick")
 */

let Home = new Schema({
    zip: { type: Number, required: true },
    address: { type: String, required: true, index: { unique: true } },
    photoUrls: [{ type: String, required: false }],
    photos: [{ type: String, required: true }],
    price: { type: String, required: true},
    bedrooms: { type: String, required: true },
    bathrooms: { type: String, required: true },
    sqft: { type: String, required: true },
    danielryanCategory: { type: String, required: true},
    eunjikimCategory: { type: String, required: true},
    sarakirshbaumCategory: { type: String, required: true},
    jamestangCategory: { type: String, required: true},
    ancherliCategory: { type: String, required: true},
    thomasmallickCategory: { type: String, required: true},
    lat: {type: Number, required: true},
    lng: {type: Number, required: true}
});

Home.pre("save", function(next) {
    // Sanitize strings
    this.address = this.address.replace(/<(?:.|\n)*?>/gm, "");
    this.category = this.category.replace(/<(?:.|\n)*?>/gm, "");
    next();
});

module.exports = mongoose.model("Home", Home);
