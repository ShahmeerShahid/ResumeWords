# API Gateway Service

## Resources:

### Keywords

**Definition**
`GET /keywords/{base64 encoded URL}/{number of keywords}`

**Response**
- `200 OK` on success
A list of keywords and their corresponding TF/IDF scores:
```json
[
    {'scalable': 0.4},
    {'engineering': 0.347},
    {'infrastructure': 0.274,},
    {'backend': 0.27},
    ...
]```

- `400 Bad Request` if URL not supported
- `401 Unauthorized` on bad API key
- `500 Internal Server Error` on internal error
