/* Copyright G. Hemingway @2019 - All rights reserved */
"use strict";

const Joi = require("@hapi/joi");

module.exports = app => {

    /*
     * Catch post requests and ask why they are doing a post
     * @return {403}
     */
    app.post("/v1/homeData/:zipcode", async (req, res) => {
       res.status(403).send({error: "not authorized to change this data"});
    });

    /**
     * See if zip code exists
     *
     * @param {req.params.zipcode} Zipcode to query for
     * @return {200 || 404}
     */
    app.head("/v1/homeData/:zipcode", async (req, res) => {
        let Home = await app.models.Home.findOne({
            zip: req.params.zipcode.toLowerCase()
        });
        if (!Home)
            res.status(404).send({ error: `unknown zipcode: ${req.params.zipcode}` });
        else res.status(200).end();
    });

    /**
     * Fetch Housing information
     *
     * @param {req.params.zipcode} Zipcode of the homes to query for
     * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
     */
    app.get("/v1/homeData/:zipcode", async (req, res) => {
        console.log(req.params.zipcode);
        let homes = await app.models.Home.find({
            zip: req.params.zipcode.toLowerCase()
        });

        console.log(homes);

        if (!homes)
            res.status(404).send({error: `unknown zipcode: ${req.params.username}`});
        else {
            // Filter games data for only profile related info
            const filteredHomes = homes.map(home => {
                return {
                    address: home.address,
                    photos: home.photos,
                    price: home.price,
                    bedrooms: home.bedrooms,
                    bathrooms: home.bathrooms,
                    sqft: home.sqft
                }
            });

            // This is where we will do the data priming to show inequality.. figure out specifics from eunji

            res.status(200).send({
                homes: filteredHomes
            });
        }
    });
};
