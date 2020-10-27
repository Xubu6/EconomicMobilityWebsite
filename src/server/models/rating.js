const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*
* home objectID

 @param {req.body.respondentId}
     * @param {req.body.classificationGroup}
     * @param {req.body.zipcode}
     * @param {req.body.address1}
     * @param {req.body.classification1}
     * @param {req.body.address2}
     * @param {req.body.classification2}
     * @param {req.body.address3}
     * @param {req.body.classification3}
     * @param {req.body.address4}
     * @param {req.body.classification4}
* */

// This was the schema for the rating system Professor Kim wanted. I don't think
// it's needed anymore, but check with her
let Rating = new Schema({
  respondentId: { type: String, required: true, index: { unique: true } },
  classificationGroup: { type: Number, required: true },
  zipcode: { type: Number, required: true },
  address1: { type: String, required: true },
  classification1: { type: String, required: true },
  address2: { type: String, required: true },
  classification2: { type: String, required: true },
  address3: { type: String, required: true },
  classification3: { type: String, required: true },
  address4: { type: String, required: true },
  classification4: { type: String, required: true },
});

Rating.pre("save", function(next) {
  // Sanitize strings
  this.address1 = this.address1.replace(/<(?:.|\n)*?>/gm, "");
  this.address2 = this.address2.replace(/<(?:.|\n)*?>/gm, "");
  this.address3 = this.address3.replace(/<(?:.|\n)*?>/gm, "");
  this.address4 = this.address4.replace(/<(?:.|\n)*?>/gm, "");
  next();
});

module.exports = mongoose.model("Rating", Rating);
