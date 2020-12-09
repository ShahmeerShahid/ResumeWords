# Keywords NLP Model service

## Resources:

### Model

**Definition**
`POST /model/tfidf`

**Request Contents**
```json
{
    "job": "Software Engineer - Backend Infrastructure (Toronto) Yelp’s mission is to connect users with great local businesses. We are an agile team that creates an amazing experience for millions...",
    "num_words": 5
}
```
**Response**
- `200 OK` on success
A JSON object with word/TF-IDF key/value pairs
```json
{
    "scalable": 0.4, 
    "engineering": 0.347, 
    "infrastructure": 0.274, 
    "backend": 0.27, 
    "docker": 0.212
}
```
- `500 Internal Server Error` if model fails


### Ping

Wakes up the model service

**Definition**
`GET /ping`

**Response**
- `200 OK` on success