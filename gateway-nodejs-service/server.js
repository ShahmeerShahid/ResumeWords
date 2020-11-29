const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const indeed_host = process.env.INDEED || "http://indeed-service:8080";
const linkedin_host = process.env.LINKEDIN || "http://linkedin-service:8080";
const monster_host = process.env.MONSTER || "http://monster-service:8080";
const model_host = process.env.MODEL || "http://model-service:8080";
const app = express();

app.get("/", function (req, res) {
    res.send("Hello world!");
});

app.get("/keywords/:url/:num_words", cors(), async (req, clientRes) => {
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
    } else if (decoded_url.includes("monster.")) {
        scraper_url = monster_host + "/job/" + url;
    }

    if (scraper_url == null) {
        clientRes.status(400).send("Unsupported website");
        return;
    }

    console.log(scraper_url);
    const jobRes = await fetch(scraper_url);
    if (jobRes.status == 400) {
        clientRes.status(400).send("URL not supported");
        return;
    }
    if (jobRes.status == 404) {
        clientRes.status(404).send("Job title and/or job description non existant on webpage");
        return;
    }
    if (jobRes.status == 500) {
        clientRes.status(500).send("Internal error in jobboard service");
        return;
    }

    const jobData = await jobRes.text();
    const modelRes = await fetch(model_host + "/model/tfidf", {
        method: "post",
        body: JSON.stringify({ job: jobData, num_words: num_words }),
        headers: { "Content-Type": "application/json" },
    })
    if (modelRes.status == 500) {
        clientRes.status(500).send("Internal error in model service");
        return;
    }

    const keywords = await modelRes.json();
    clientRes.json(keywords);
    return;
});

app.listen(PORT, () =>
    console.log(`gateway-nodejs service running on port ${PORT}`)
);
