/**
 * Created on 4/12/21 by jovialis (Dylan Hanson)
 **/

const express = require('express');
const router = express.Router();

const homeDataRouter = require('./home');
const ratingRouter = require('./rating');
const respondentRouter = require('./respondent');

router.use('/home', homeDataRouter);
router.use('/rating', ratingRouter);
router.use('/respondent', respondentRouter);

module.exports = router;