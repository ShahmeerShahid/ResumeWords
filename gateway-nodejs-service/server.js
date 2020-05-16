const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const indeed_host = process.env.INDEED || "http://indeed-service:8080";
const linkedin_host = process.env.LINKEDIN || "http://linkedin-service:8080";
const model_host = process.env.MODEL || "http://model-service:8080";
const app = express();

app.get("/", function (req, res) {
    res.send("Hello world!");
});

app.get("/keywords/:url/:num_words", cors(), (req, clientRes) => {
    const decoded_url = req.params.url;
    const url = encodeURIComponent(decoded_url);
    var num_words = req.params.num_words;
    console.log("Encoded url: " + url);
    console.log("Decoded url: " + decoded_url);
    var scraper_url = null;

    if (decoded_url.includes("indeed.")) {
        scraper_url = indeed_host + "/job/" + url;
    } else if (decoded_url.includes("linkedin.")) {
        scraper_url = linkedin_host + "/job/" + url;
    }

    if (scraper_url == null) {
        clientRes.status(400).send("Unsupported website");
        return;
    }

    console.log(scraper_url);
    fetch(scraper_url) // Retrieve job data (title and description)
        .then((jobRes) => {
            if (jobRes.ok) {
                return jobRes.text();
            } else if (jobRes.status == 400) {
                throw new HTTPError("URL not supported", 400);
            } else if (jobRes.status == 404) {
                throw new HTTPError(
                    "Job title and/or job description non existant on webpage",
                    404
                );
            } else if (jobRes.status == 500) {
                throw new HTTPError("Internal error in jobboard service", 500);
            }
        })
        .then((jobData) => {
            // Retrieve keywords from model with job data
            fetch(model_host + "/model/tfidf", {
                method: "post",
                body: JSON.stringify({ job: jobData, num_words: num_words }),
                headers: { "Content-Type": "application/json" },
            }).then((modelRes) => modelResponseHandler(clientRes, modelRes));
        })
        .catch((err) => {
            if (err instanceof HTTPError) {
                clientRes.status(err.status).send(err.message);
            } else {
                clientRes
                    .status(500)
                    .send(
                        "Internal server error in gateway service: " +
                            err.message
                    );
                throw err;
            }
        });
});

function modelResponseHandler(clientRes, modelRes) {
    if (modelRes.status == 500) {
        throw new HTTPError("Internal error in model service");
    }
    modelRes.json().then((keywords) => {
        clientRes.json(keywords);
        return;
    });
}

class HTTPError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

app.listen(PORT, () =>
    console.log(`gateway-nodejs service running on port ${PORT}`)
);