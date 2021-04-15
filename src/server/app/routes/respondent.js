/* Copyright D. Ryan @2019 - All rights reserved */

const express = require('express');
const router = express.Router();

const Joi = require('joi');

const mongoose = require('mongoose');
const Respondent = mongoose.model('Respondent');

/*
 * Logging a respondent in / creating a respondent
 * @param {req.body.respondentId}
 * @return {200 || 403}
 */
router.post("/login", async (req, res, next) => {

    // Respondent already logged in? Ignore
    if (req.session.respondent) {
        return res.status(200).json({
            loggedIn: true,
            respondentId: req.session.respondent.respondentId
        });
    }

    // Validation schema
    const schema = Joi.object({
        respondentId: Joi.string().alphanum().min(4).max(10)
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({error: "Invalid respondent ID provided."});
    }

    const respondentId = validation.value.respondentId.toLowerCase();

    // Check if a respondent by that ID already exists.
    const existingRespondent = await Respondent.findOne({ respondentId })
    if (existingRespondent) {
        // Update last login
        await Respondent.updateOne({_id: existingRespondent._id}, {
            lastLogin: Date.now()
        });

        // Store the session
        req.session.respondent = existingRespondent;
        return res.status(200).json({
            loggedIn: true,
            respondentId: respondentId
        });
    }

    // Otherwise, generate a new respondent document and save it
    req.session.respondent = await Respondent.create({
        respondentId,
        experimentalGroup: Math.ceil(Math.random()*4),
    });

    res.status(200).json({
        loggedIn: true,
        respondentId: respondentId
    });
});

/**
 * Logs a user out
 */
router.post('/logout', (req, res, next) => {
    // Respondent already logged in? Ignore
    if (req.session.respondent) {
        req.session.respondent = null;
        return res.status(200).json({loggedOut: true});
    }
    return res.status(200).json({loggedOut: false});
})


module.exports = router;