from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import requests
import base64
import json

app = Flask(__name__)
CORS(app)
api = Api(app)

def reqParser(parser, args):
    for i in range(len(args)):
        parser.add_argument(args[i], required=True, location='json')
    return

class Keywords(Resource):
    def get(self, url, num_words):
        '''
        GET num_words number of keywords from the supplied URL
        '''
        parser = reqparse.RequestParser()
        decoded_url = base64.b64decode(url).decode()
        scraper_url = None
        if "indeed." in decoded_url:
            scraper_url = f'http://indeed-service/job/{url}'
                
        # add support for more websites
        if scraper_url == None:
            return "Unsupported website", 400

        job_data, status_code = self.scrape(scraper_url)
        if status_code != 200:
            return job_data, status_code
        
        model_request = requests.post("http://model-service/model/tfidf", json={"job": job_data, "num_words": num_words})
        return json.loads(model_request.text), model_request.status_code

        
    def scrape(self, service_url):
        request = requests.get(service_url)
        return json.loads(request.text), request.status_code
        

api.add_resource(Keywords, '/keywords/<path:url>/<int:num_words>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80)
