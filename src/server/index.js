/* Copyright D. Ryan @2019 - All rights reserved */
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

/**********************************************************************************************************/

const setupServer = async () => {
    // Get the app config
    //"mongodb": "mongodb://127.0.0.1:27017/zillow",
    //"mongodb": "mongodb+srv://dtryan:z%4027nKfHHyFn_bM@cluster0-3xvei.mongodb.net/test?retryWrites=true&w=majority",

    // 'mongodb://<sample-user>:<password>@sample-cluster.node.us-east-1.docdb.amazonaws.com:27017/sample-database?ssl=true&replicaSet=rs0&readPreference=secondaryPreferred',

    // mongodb://zillow-docdb-cluster.cluster-cuusjgphml3x.us-east-2.docdb.amazonaws.com:27017/?gssapiServiceName=mongodb

    // url for where the images are hosted
    // images are hosted on Amazon Documen DB instance.. Prof. Kim should have login info
    let doc_db_url = "mongodb://ZillowProjUser:ZillowProjPass@zillow-docdb-cluster.cuusjgphml3x.us-east-2.docdb.amazonaws.com:27017/zillow?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&retryWrites=false";

    // zillow-docdb-cluster.cluster-cuusjgphml3x.us-east-2.docdb.amazonaws.com:27017

    const env = process.env.NODE_ENV ? process.env.NODE_ENV : "dev";

    const conf = envConfig("../../config/config.json", env);
    const port = process.env.PORT ? process.env.PORT : conf.port;

    let certFileBuf;
    let options;

    if (env !== "dev") {
        // this cert file is for connect to the document DB
        console.log("cert file loaded");
        certFileBuf = [fs.readFileSync("rds-combined-ca-bundle.pem")];
        options = {
            ssl: true,
            sslCA: certFileBuf,
            sslValidate: true,
        };
    } else {
        console.log("env is dev");
    }


    // Setup our Express pipeline
    let app = express();
    if (env !== "test") app.use(logger("dev"));
    app.engine("pug", require("pug").__express);
    app.set("views", __dirname);
    app.use(express.static(path.join(__dirname, "../../public")));
    //app.use(logger('dev'));

    // Setup pipeline session support
    app.use(session({
        name: "session",
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
        //mongoose.set('ssl', true);
        // mongoose.set('sslValidate', true)
        // mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true );
        const mongoUrl = (env === "dev") ? conf.mongodbLocal : conf.mongodb;

        await mongoose.connect(mongoUrl, options);

        //await mongoose.connect(doc_db_url, options);
        console.log(`MongoDB connected: ${mongoUrl}`);
    } catch (err) {
        console.log("Connection ERROR: " + err);
        process.exit(-1);
    }

    // Import our Data Models
    app.models = {
        Home: require("./models/home"),
        Rating: require("./models/rating"),
        Respondent: require("./models/respondent")
    };

    // Setting the app to know that it is behind a local proxy, this sets the remote address to the req address
    app.set('trust proxy', '127.0.0.1');

    // Import our routes
    require("./api")(app);

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
                respondentId: respondent.respondentId,
                experimentalGroup: respondent.experimentalGroup
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
            console.log(`Secure Inequality Website listening on: ${server.address().port}`);
        });
        // Redirect HTTP to HTTPS
        http
            .createServer((req, res) => {
                //const location = `https://${req.headers.host}${req.url}`;
                // I hardcoded this http->https redirect because of bots crawling the ec2
                const location = `https://studier.me`;
                console.log(`Redirect to: ${location}`);
                res.writeHead(302, { Location: location });
                res.end();
            })
            .listen(80, () => {
                console.log(`Inequality website listening on 80 for HTTPS redirect`);
            });
    } else {
        server = app.listen(port, () => {
            console.log(`Inequality Website ${env} listening on: ${server.address().port}`);
        });
    }
};

/**********************************************************************************************************/

// Run the server
setupServer();
