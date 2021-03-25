/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

const Joi = require("@hapi/joi");
const {sortByPrice} = require("../helper");

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
                zip: req.params.zipcode.toLowerCase(),
                $and: [ { $where: "this.jamestangCategory == this.ancherliCategory"}, {jamestangCategory: { $in: [ "rich", "medium", "poor" ] }}]
            });
            console.log(Home)
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
                zip: req.params.zipcode.toLowerCase(),
                // following filter is to only query for housing entries where james and ancher categories both exist and are equal and are poor, rich, or medium
                $and: [{ $where: "this.jamestangCategory == this.ancherliCategory"}, { jamestangCategory: { $in: [ "rich", "medium", "poor" ] }}]
            });

            if (!homes || homes.length === 0) {
                console.log(`Unknown zipcode error for ${req.session.respondent.respondentId} requesting ${req.params.zipcode}`);
                res.status(404).send({error: `unknown zipcode: ${req.params.zipcode}`});
            }
            else {
                let poorCnt = 0, medCnt = 0, richCnt = 0; // counts for number of each classification in this zip code

                const filteredHomes = homes.map(home => {
                    const classification = (home.jamestangCategory === home.ancherliCategory) ? home.jamestangCategory : "no classification";

                    if (classification === "poor") poorCnt++;
                    if (classification === "medium") medCnt++;
                    if (classification === "rich") richCnt++;

                    return {
                        _id: home._id,
                        address: home.address,
                        photos: home.photos,
                        price: parseInt(home.price, 10),
                        bedrooms: home.bedrooms,
                        bathrooms: home.bathrooms,
                        sqft: home.sqft,
                        classification: classification, // guaranteed to be the correct classification
                        lat: home.lat,
                        lng: home.lng
                    }
                });

                // only fetch results if there are 10+ of each classification of homes in the desired zipcode
                if (poorCnt > 9 && medCnt > 9 && richCnt > 9) {
                    // sorting by price
                    console.log("Sorting by price");
                    filteredHomes.sort(sortByPrice);

                    // FIXME This is where we will do the data priming to show inequality.. figure out specifics from eunji

                    console.log(`Send ${filteredHomes.length} homes for ${req.params.zipcode} to ${req.session.respondent.respondentId}`)
                    res.status(200).send({
                        homes: filteredHomes
                    });
                } else {
                    console.log(`Not enough homes with each classification in the zipcode ${req.params.zipcode}`);
                    console.log("poor count: " + poorCnt + ", medium count: " + medCnt + ", rich count: " + richCnt);
                    res.status(404).send({error: `Not enough homes in zipcode: ${req.params.zipcode}`});
                }
            }
        } else {
            console.log(`No user logged in, suspicious activity`);
            res.status(401).send();
        }
    });
};
