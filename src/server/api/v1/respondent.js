/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

module.exports = app => {

    /*
     * Logging a respondent in / creating a respondent
     * @param {req.body.respondentId}
     * @return {200 || 403}
     */
    app.post("/v1/respondent", async (req, res) => {
        // FIXME check that the respondentId exists within the list of Ids???!!! or should I just accept it as right???

        if (!req.body.respondentId.includes("danielryan")){
            res.status(401).send();
            return;
        }

        // Generate grouping (4 groups)
        // 1 - ?
        // 2 - ?
        // 3 - ?
        // 4 - ?
        let experimentalGroup = Math.ceil(Math.random()*4);
        if (experimentalGroup < 1 || experimentalGroup > 4){
            console.log(`Grouping error. ${experimentalGroup} is not valid (1-4)`);
            res.status(500).send({error: "Internal error, please try again"});
        } else {

            let respondentData = {
                respondentId: req.body.respondentId,
                experimentalGroup: experimentalGroup
            };

            try {
                // FIXME is this gonna be new or checking that one already exists
                let respondent = new app.models.Respondent(respondentData);

                // Save it now yes
                try {
                    // Save the respondent
                    await respondent.save();

                    // Log the respondent in
                    req.session.regenerate(() => {
                        // Set the session information
                        req.session.respondent = {
                            respondentId: respondentData.respondentId,
                            experimentalGroup: respondentData.experimentalGroup,
                            _id: respondent._id
                        };
                        console.log(`Respondent.login success: ${req.session.respondent._id}`);

                        // Return the respondent Info
                        res.status(201).send({
                            respondentId: respondentData.respondentId,
                            experimentalGroup: respondentData.experimentalGroup
                        });
                    });

                } catch (err) {
                    console.log(`Respondent creation error: ${err}`);
                    res.status(400).send({ error: "Invalid respondent information" });
                }

            } catch (err) {
                console.log(`Respondent validation error: ${err}`);
                res.status(500).send({error: "Incomplete respondent information"});
            }
        }
    });

    /**
     * See if respondent exists
     * @param req.param.id
     * @return {200 || 404}
     */
    app.head("/v1/respondent/:respondentId", async (req, res) => {
        let user = await app.models.Respondent.findOne({
            respondentId: req.params.respondentId.toLowerCase()
        });
        if (!user)
            res.status(404).send({ error: `unknown respondent: ${req.params.respondentId}` });
        else res.status(200).end();
    });

    app.delete("/v1/respondent/", async (req, res) => {
        if (req.session.respondent) {
            req.session.destroy(() => {
                res.status(204).end();
            });
        } else {
            res.status(200).end();
        }
    });


    /**
     * Fetch rating information by respondentId
     *
     * @param {req.body.respondentId} respondentId for the respondent
     * @return {200, {username, primary_email, first_name, last_name, city, games[...]}}
     */
    app.get("/v1/respondent/:respondentId", async (req, res) => {
        console.log(req.params.respondentId);
        if (req.session.respondent) {
            let respondent = await app.models.Respondent.findOne({
                respondentId: req.params.respondentId.toLowerCase()
            });

            if (!respondent)
                res.status(404).send({error: `unknown respondentId: ${req.params.respondent}`});
            else {
                res.status(200).send({
                    respondent: respondent,
                });
            }
        } else {
            res.status(401).send();
        }
    });
};
