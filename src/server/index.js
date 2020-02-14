/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
const envConfig = require("simple-env-config");
//const RedisStore = require("connect-redis")(session);
//const redis = require("redis").createClient();

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

/**********************************************************************************************************/

const setupServer = async () => {
    // Get the app config
    const conf = await envConfig("./config/config.json", env);
    const port = process.env.PORT ? process.env.PORT : conf.port;

    // Setup our Express pipeline
    let app = express();
    if (env !== "test") app.use(logger("dev"));
    app.engine("pug", require("pug").__express);
    app.set("views", __dirname);
    app.use(express.static(path.join(__dirname, "../../public")));
    app.use(logger('dev'));

    // let redis = require('redis');
    // let client = redis.createClient(`6379`, `127.0.0.1`);
    //
    // client.on('ready', () => { 
    //   console.log(`\tRedis Connected.`); 
    // }).on(`error`, (err) => {
    //   console.log(`Not able to connect to Redis.`); 
    //   process.exit(-1); 
    // });

    // const redisOptions = {
    //   host: "localhost",
    //   port: 6379,
    //   client: redis
    // };

    // Setup pipeline session support
    app.use(session({
        name: "session",
        //store: new RedisStore(redisOptions),
        secret: "wealthinequality",
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: "/",
            httpOnly: false,
            secure: false
        }
    }));

    //app.use(app.store);
    // Finish with the body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Connect to MongoDB
    try {
        // Dont want to see MongooseJS deprecation warnings
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true );
        await mongoose.connect(conf.mongodb);
        console.log(`MongoDB connected: ${conf.mongodb}`);
    } catch (err) {
        console.log(err);
        process.exit(-1);
    }

    // Import our Data Models
    app.models = {
        Home: require("./models/home"),
    };

    // Import our routes
    require("./api")(app);

    // Give them the SPA base page
    app.get("*", (req, res) => {
        const user = req.session.user;
        console.log(`Loading app for: ${user ? user.username : "nobody!"}`);
        let preloadedState = user
            ? {
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                primary_email: user.primary_email,
                city: user.city,
                games: user.games
            }
            : {};
        preloadedState = JSON.stringify(preloadedState).replace(/</g, "\\u003c");
        res.render("base.pug", {
            state: preloadedState
        });
    });

    // Run the server itself
    let server;
    if (env === "production") {
        const options = {
            key: fs.readFileSync(conf.security.keyPath),
            cert: fs.readFileSync(conf.security.certPath),
            ca: fs.readFileSync(conf.security.caPath)
        };
        // Listen for HTTPS requests
        server = https.createServer(options, app).listen(port, () => {
            console.log(`Secure Assignment 5 listening on: ${server.address().port}`);
        });
        // Redirect HTTP to HTTPS
        http
            .createServer((req, res) => {
                //const location = `https://${req.headers.host}${req.url}`;
                const location = `https://studier.me`;
                console.log(`Redirect to: ${location}`);
                res.writeHead(302, { Location: location });
                res.end();
            })
            .listen(80, () => {
                console.log(`Assignment 5 listening on 80 for HTTPS redirect`);
            });
    } else {
        server = app.listen(port, () => {
            console.log(`Assignment 5 ${env} listening on: ${server.address().port}`);
        });
    }
};

/**********************************************************************************************************/

// Run the server
setupServer();
