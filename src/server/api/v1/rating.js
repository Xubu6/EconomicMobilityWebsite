/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

module.exports = app => {

    /*
     * Submit user ratings for an address (mongo object ID??)
     * @param {req.body.respondentId}
     * @param {req.body.address}
     * @param {req.body.rating1}
     * @param {req.body.rating2}
     * @param {req.body.rating3}
     * @return {200 || 403}
     */
    app.post("/v1/rating", async (req, res) => {
        if (req.session.respondent) {
            try {

                let query = {
                    home: req.body._id,
                    respondent: req.session.respondent._id
                };

                let rating = await app.models.Rating.findOneAndUpdate(query, {
                    home: req.body._id,
                    respondent: req.session.respondent._id,
                    rating1: req.body.rating1,
                    rating2: req.body.rating2,
                    rating3: req.body.rating3
                }, {upsert: true, new: true});

                console.log(`Saved the rating for home id ${req.body._id} at address ${req.body.address}`);

                res.status(200).send({
                    address: req.body.address
                });
            } catch (e){
                console.log(`Error on rating save: ${e}`);
                res.status(402).send({error: "Bad data"});
            }
        } else {
            res.status(401).send({error: "Not authorized"});
        }
    });

    /**
     * See if rating exists
     *
     * @return {200 || 404}
     */
    app.head("/v1/rating", async (req, res) => {
        res.status(403).send({error: "Why are you doing this"});
        // let Home = await app.models.Home.findOne({
        //     zip: req.params.zipcode.toLowerCase()
        // });
        // if (!Home)
        //     res.status(404).send({ error: `unknown zipcode: ${req.params.zipcode}` });
        // else res.status(200).end();
    });

    /**
     * Fetch rating information by userID
     *
     * @param {req.body.respondentId} userID for the respondent
     * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
     */
    app.get("/v1/rating/:zipcode", async (req, res) => {
        res.status(501).send({error: "Not implemented yet"});
    });
};
