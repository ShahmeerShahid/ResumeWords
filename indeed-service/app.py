from flask import Flask, request
from flask_restful import Resource, Api, reqparse
import base64
from bs4 import BeautifulSoup
from selenium import webdriver
import urllib.parse as urlparse
from urllib.parse import parse_qs

app = Flask(__name__)
api = Api(app)


class JobData(Resource):
    def get(self, url):
        '''
        GET job title and job data of supplied indeed job page
        '''
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        options.add_argument('--headless')
        options.add_argument('--disable-gpu')
        driver = webdriver.Chrome(chrome_options=options)

        decoded_url = base64.b64decode(url).decode()
        parsed_url = urlparse.urlparse(decoded_url)
        url_params = parse_qs(parsed_url.query)

        if 'jk' not in url_params and 'vjk' not in url_params:
            return "Not a job page, no job code found in URL parameters", 400
        if 'jk' in url_params:
            jk = url_params['jk'][0]
        else:
            jk = url_params['vjk'][0]
        url = "https://www.indeed.com/viewjob?" + "jk=" + jk

        driver.get(url)
        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Check if both job description and job title exist in page
        job_title = soup.find("h3", {"class":"icl-u-xs-mb--xs icl-u-xs-mt--none jobsearch-JobInfoHeader-title"}).contents[0]
        if not job_title or not soup.find(id="jobDescriptionText").contents:
            return "Job title or description not found in page", 404

        job_description = ""
        for line in soup.find(id="jobDescriptionText").contents:
            job_description += line.get_text(separator=' ') + " "
        
        return job_title + " " + job_description, 200


api.add_resource(JobData, '/job/<path:url>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
