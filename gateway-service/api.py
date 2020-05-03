from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import base64

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
        print(decoded_url)
        return decoded_url


api.add_resource(Keywords, '/keywords/<path:url>/<int:num_words>')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
