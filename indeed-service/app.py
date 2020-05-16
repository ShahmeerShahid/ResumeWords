from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from bs4 import BeautifulSoup
import urllib.parse as urlparse
from urllib.parse import parse_qs, unquote
import requests
import os

app = Flask(__name__)
api = Api(app)

PORT = int(os.getenv("PORT", "8080"))


class JobData(Resource):
    def get(self, url):
        """
        GET job title and job data of supplied indeed job page
        """

        print("Indeed service received encoded URL: " + url)
        decoded_url = unquote(url)
        print("Decoded URL: " + decoded_url)
        parsed_url = urlparse.urlparse(decoded_url)
        url_params = parse_qs(parsed_url.query)

        if "jk" not in url_params and "vjk" not in url_params:
            return "Not a job page, no job code found in URL parameters", 400
        if "jk" in url_params:
            jk = url_params["jk"][0]
        else:
            jk = url_params["vjk"][0]
        url = "https://www.indeed.com/viewjob?" + "jk=" + jk

        r = requests.get(url).content
        soup = BeautifulSoup(r, "html.parser")

        # Check if both job description and job title exist in page
        if not soup.find(
            "h3",
            {
                "class": "icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"
            },
        ) or not soup.find(id="jobDescriptionText"):
            return "Job title or description not found in page", 404

        job_title = soup.find(
            "h3",
            {
                "class": "icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"
            },
        ).contents[0]
        job_description = soup.find(id="jobDescriptionText").get_text(separator=" ")

        return job_title + " " + job_description, 200


api.add_resource(JobData, "/job/<path:url>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
