/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

const Joi = require("@hapi/joi");

module.exports = app => {

    /*
     * Update the house information (Only applicable when a user is submitting house classifications
     * @param {req.body._id}
     * @param {req.body.category}
     * @param {req.body.address}
     * @return {200 | 403}
     */
    app.post("/v1/homeData", async (req, res) => {

        if (req.session.respondent) {

            let home = true;

            // update object that will edit the mongoObject
            let update = {};

            // dynamic fieldName, unique to each RA
            let fieldName = req.session.respondent.respondentId + "Category";

            // setting the dynamic field to that category rating
            update[fieldName] = req.body.category;

            // Atomic (i think) operation that sets enacts the update
            await app.models.Home.findByIdAndUpdate(
                { _id: req.body._id},
                update,
                { new: true},
                (err, result) => {
                    if (err){
                        home = false;
                        console.log(`Home with address: ${req.body.address} not found`);
                    } else {
                        home = true;
                    }
                });

            if (home){

                // send success
                console.log(`${req.body.address} rated by ${req.session.respondent.respondentId} as ${req.body.category}`)
                res.status(200).send({
                    "address": req.body.address,
                    _id: req.body._id,
                    "category": req.body.category
                });

            } else {

                console.log(`Rating failure for ${req.body.address} by ${req.session.respondent.respondentId}`)
                res.status(400).send();

            }
        } else {

            console.log(`No user logged in, suspicious activity`);
            res.status(401).send();

        }


    });

    /**
     * See if zip code exists
     *
     * @param {req.params.zipcode} Zipcode to query for
     * @return {200 || 404}
     */
    app.head("/v1/homeData/:zipcode", async (req, res) => {
        if (req.session.respondent) {
            let Home = await app.models.Home.findOne({
                zip: req.params.zipcode.toLowerCase()
            });
            if (!Home)
                res.status(404).send({error: `unknown zipcode: ${req.params.zipcode}`});
            else res.status(200).end();
        } else {}
        res.status(401).end();
    });

    /**
     * Fetch Housing information
     *
     * @param {req.params.zipcode} Zipcode of the homes to query for
     * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
     */
    app.get("/v1/homeData/:zipcode", async (req, res) => {

        if (req.session.respondent) {
            let homes = await app.models.Home.find({
                zip: req.params.zipcode.toLowerCase()
            });

            if (!homes) {
                console.log(`Unknown zipcode error for ${req.sesssion.respondent.respondentId} requesting ${req.params.zipcode}`);
                res.status(404).send({error: `unknown zipcode: ${req.sesssion.respondent.respondentId}`});
            }
            else {
                const filteredHomes = homes.map(home => {
                    return {
                        _id: home._id,
                        address: home.address,
                        photos: home.photos,
                        price: home.price,
                        bedrooms: home.bedrooms,
                        bathrooms: home.bathrooms,
                        sqft: home.sqft,
                        category: home.category,
                        lat: home.lat,
                        lng: home.lng
                    }
                });

                // FIXME This is where we will do the data priming to show inequality.. figure out specifics from eunji

                console.log(`Send ${filteredHomes.length} homes for ${req.params.zipcode} to ${req.session.respondent.respondentId}`)
                res.status(200).send({
                    homes: filteredHomes
                });
            }
        } else {
            console.log(`No user logged in, suspicious activity`);
            res.status(401).send();
        }
    });
};
