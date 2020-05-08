const express = require('express');
const fetch = require('node-fetch')
const atob = require('atob')
// a
const PORT = 80;
const HOST = '0.0.0.0';

const app = express();

app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/keywords/:url/:num_words', (req, clientRes) => {
    var url = req.params.url;
    var num_words = req.params.num_words;
    var decoded_url = atob(url); // base64 decode
    var scraper_url = null;

    if (decoded_url.includes("indeed.")) {
        scraper_url = 'http://indeed-service/job/' + url
    }

    if (scraper_url == null) {
        clientRes.status(400).send('Unsupported website')
        return;
    }


    fetch(scraper_url) // Retrieve job data (title and description)
        .then(jobRes => {
            if (jobRes.ok) {
                return jobRes.text();
            } else if (jobRes.status == 404) {
                throw new HTTPError("Job title and/or job description non existant on webpage", 404);
            } else if (jobRes.status == 500) {
                throw new HTTPError("Internal error in jobboard service", 500);
            }
        })
        .then(jobData => { // Retrieve keywords from model with job data
            fetch("http://model-service/model/tfidf", {
                method: 'post',
                body: JSON.stringify({ 'job': jobData, 'num_words': num_words }),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(modelRes => modelResponseHandler(clientRes, modelRes));
        })
        .catch((err) => {
            if (err instanceof HTTPError) {
                clientRes.status(err.status).send(err.message);
            } else {
                clientRes.status(500).send("Internal server error in gateway service: " + err.message);
                throw err;
            }
        });
});

function modelResponseHandler(clientRes, modelRes) {
    if (modelRes.status == 500) {
        throw new HTTPError("Internal error in model service");
    }
    modelRes.json().then(keywords => {
        clientRes.json(keywords);
        return;
    })
}

class HTTPError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}


app.listen(PORT, () => console.log(`gateway-nodejs service running on port ${PORT}`))