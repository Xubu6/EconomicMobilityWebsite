/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

module.exports = (app) => {
  /*
   * Submit user ratings for a respondent
   * @param {req.body.respondentId}
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
   * @return {200 || 403}
   */
  app.post("/v1/rating", async (req, res) => {
    if (req.session.respondent) {
      let ratingData = {
        respondentId: req.body.respondentId,
        classificationGroup: req.body.classificationGroup,
        zipcode: req.body.zipcode,
        address1: req.body.address1,
        classification1: req.body.classification1,
        address2: req.body.address2,
        classification2: req.body.classification2,
        address3: req.body.address3,
        classification3: req.body.classification3,
        address4: req.body.address4,
        classification4: req.body.classification4
      };

      console.log(`Respondent ID: ${ratingData.respondentId}`)
      console.log(ratingData)

      try {

        let rating = new app.models.Rating(ratingData);

        console.log(`rating model data: ${rating}`)

        try {
          await rating.save();

          console.log(
            `Rating creation success: ${rating}`
          );

        } catch (err) {
          console.log(`Rating creation error: ${err} and rating data: ${rating}`);
          res.status(400).send({ error: "Invalid rating information" });
        }

        console.log(
          `Saved the rating for respondent ${ratingData.respondentId} and ratingData: ${ratingData}`
        );

      } catch (e) {
        console.log(`Error on rating save: ${e}`);
        res.status(402).send({ error: "Bad data" });
      }
    } else {
      res.status(401).send({ error: "Not authorized" });
    }
  });

  /**
   * See if rating exists
   *
   * @return {200 || 404}
   */
  app.head("/v1/rating", async (req, res) => {
    res.status(403).send({ error: "Why are you doing this" });
    // let Home = await app.models.Home.findOne({
    //     zip: req.params.zipcode.toLowerCase()
    // });
    // if (!Home)
    //     res.status(404).send({ error: `unknown zipcode: ${req.params.zipcode}` });
    // else res.status(200).end();
  });

  /**
     * Fetch rating information by respondentId
     *
     * @param {req.body.respondentId} respondentId for the respondent
     * @return
     */
    app.get("/v1/rating/:respondentId", async (req, res) => {
        console.log(req.params.respondentId);
        if (req.session.respondent) {
            let rating = await app.models.Rating.findOne({
                respondentId: req.params.respondentId
            });

            if (!rating)
                res.status(404).send({error: `unknown respondentId with ratings: ${req.params.respondent}`});
            else {
                res.status(200).send({
                    rating: rating,
                });
            }
        } else {
            res.status(401).send();
        }
    });
};
