from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from bs4 import BeautifulSoup
import requests
import urllib.parse as urlparse
from urllib.parse import parse_qs, unquote
import os

app = Flask(__name__)
api = Api(app)

PORT = int(os.getenv('PORT', '8080'))

class JobData(Resource):
    def get(self, url):
        '''
        GET job title and job data of supplied LinkedIn job page
        '''
        
        print('LinkedIn service received encoded URL: ' + url)
        decoded_url = unquote(url)
        print('Decoded URL: ' + decoded_url)
        r = requests.get(decoded_url)
        soup = BeautifulSoup(r.content, "html.parser")

        # Check if both job description and job title exist in page
        if not soup.find("h1", {"class":"topcard__title"}) or not soup.find("div", {"class":"description__text description__text--rich"}):
            return "Job title or description not found in page", 404

        job_title = soup.find("h1", {"class":"topcard__title"}).get_text()
        job_description = soup.find("div", {"class":"description__text description__text--rich"}).get_text(separator=' ')
        
        return job_title + " " + job_description, 200


api.add_resource(JobData, '/job/<path:url>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT, debug=True)
