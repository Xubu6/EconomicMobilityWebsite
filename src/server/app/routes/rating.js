/* Copyright D. Ryan @2019 - All rights reserved */

const express = require('express');
const router = express.Router();

const Joi = require('joi');

const mongoose = require('mongoose');
const Respondent = mongoose.model('Respondent');
const Rating = mongoose.model('Rating');
const Home = mongoose.model('Home');
const HomeSample = mongoose.model('HomeSample');

/*
  * Submit user ratings for a respondent

  * @return {200 || 403}
  */
router.post('/', async (req, res, next) => {

    // No repsondent? Not allowed
    if (!req.session.respondent) {
        return res.status(401).send({error: "Not logged in."});
    }

    // Prevent double rating
    const existingRating = await Rating.findOne({respondent: req.session.respondent});
    if (existingRating) {
        return res.status(401).send({error: "Cannot submit two entries."});
    }

    // Make sure there has been a Home Sample generated.
    const sample = await HomeSample.findOne({respondent: req.session.respondent});
    if (!sample) {
        return res.status(401).send({error: "No Home Sample generated for user."});
    }

    // Validation schema
    const schema = Joi.object({

        bestAddress1: Joi.string().min(1),
        bestAddress2: Joi.string().min(1),

        worstAddress2: Joi.string().min(1),
        worstAddress1: Joi.string().min(1),

    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({error: "Invalid rating submitted."});
    }

    // Lookup each home:
    const ratingSchema = {
        respondent: req.session.respondent,
        homeSample: sample,

        bestAddress1: await Home.findOne({address: validation.value.bestAddress1}).select('_id'),
        bestAddress2: await Home.findOne({address: validation.value.bestAddress2}).select('_id'),
        worstAddress2: await Home.findOne({address: validation.value.worstAddress2}).select('_id'),
        worstAddress1: await Home.findOne({address: validation.value.worstAddress1}).select('_id'),
    };

    if (!ratingSchema.bestAddress1 || !ratingSchema.bestAddress2 || !ratingSchema.worstAddress1 || !ratingSchema.worstAddress2) {
        return res.status(400).json({error: "An error occurred while looking up one of the addresses."});
    }

    // Generate the rating
    await Rating.create(ratingSchema);

    console.log(`Saved the rating for respondent ${req.session.respondentId}.`);
    return res.status(200).json({success: true});
});

module.exports = router;