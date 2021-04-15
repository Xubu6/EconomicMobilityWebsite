/**
 * Created on 4/12/21 by jovialis (Dylan Hanson)
 **/

const express = require("express");
const mongoose = require('mongoose');

const bodyParser = require("body-parser");
const logger = require("morgan");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const path = require("path");
const config = require('../config');

// Setup our Express pipeline
let app = express();

app.use(logger(config.DEVELOPMENT ? "dev" : "short"));

// JSON parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sessions support
app.use(session({
    name: "auth.id",
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    proxy: config.PRODUCTION,
    store: new MongoStore({
        mongoUrl: config.MONGODB_URI
    }),
    cookie: {
        path: "/",
        httpOnly: true,
        secure: config.PRODUCTION
    }
}));

// Register routes
const apiRouter = require('./routes');
app.use('/api', apiRouter);

// Set up frontend engine
app.engine("pug", require("pug").__express);
app.set("views", __dirname);
app.use(express.static(path.join(__dirname, "../../../public")));

// Give them the SPA base page
app.get("*", (req, res) => {

    if (!req.session.respondent){
        if (!(req.path === '/' || req.path === ("/v1/respondent"))){
            return res.status(401).send();
        }
    }

    const respondent = req.session.respondent;
    console.log(`Loading app for: ${respondent ? respondent.respondentId : "nobody!"}`);
    let preloadedState = respondent
        ? {
            respondentId: respondent.respondentId
        }
        : {};
    preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
    res.render("base.pug", {
        state: preloadedState
    });
});

module.exports = app;