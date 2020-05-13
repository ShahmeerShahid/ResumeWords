from flask import Flask, request, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from models.tfidf.TFIDFModel import TFIDFModel
import json, os

app = Flask(__name__)
CORS(app)
api = Api(app)
PORT = int(os.getenv('PORT', '8080'))

def reqParser(parser, args):
    for i in range(len(args)):
        parser.add_argument(args[i], required=True, location='json')
    return

class TFIDFResource(Resource):
    '''
    
    '''
    def post(self):
        parser = reqparse.RequestParser()
        reqParser(parser, ['job', 'num_words'])
        args = parser.parse_args()
        model = TFIDFModel()
        return model.getKeywords(args['job'], int(args['num_words'])), 200

api.add_resource(TFIDFResource, '/model/tfidf')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=PORT)
