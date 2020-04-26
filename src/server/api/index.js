"use strict";

module.exports = app => {
    require("./v1/homeData")(app);
    require("./v1/respondent")(app);
    require("./v1/rating")(app);
};

