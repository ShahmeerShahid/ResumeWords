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
        GET job title and job data of supplied Monster job page
        """

        print("Monster service received encoded URL: " + url, flush=True)
        decoded_url = unquote(url)
        print("Decoded URL: " + decoded_url, flush=True)

        parsed_url = urlparse.urlparse(decoded_url)
        url_params = parse_qs(parsed_url.query)

        jobId = None
        if "jobid" in url_params:
            jobId = url_params["jobid"][0]
        elif "id" in url_params:
            jobId = url_params["id"][0]

        if jobId:
            url =  "https://job-openings.monster.com/a/" + jobId
        else:
            if "job-openings." in parsed_url.netloc:
                url = decoded_url
            else:
                return "Not a job page, no job code found in URL parameters", 400

        print(url)
        r = requests.get(url).content
        soup = BeautifulSoup(r, "html.parser")

        job_description_div = soup.select_one('#JobDescription')
        job_title_div = soup.select_one("#JobViewHeader > header > div > h1")
        
        if not (job_description_div and job_title_div):
            print(job_description_div, job_title_div)
            return "Job title or description not found in page", 404

        job_description = job_description_div.get_text()
        job_title = job_title_div.get_text()
        return job_title + " " + job_description, 200


api.add_resource(JobData, "/job/<path:url>")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT, debug=True)
