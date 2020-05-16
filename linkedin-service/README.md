# LinkedIn Job description scraper service

## Resources:

### Job Data

**Definition**
`GET /job/{URL-encoded URL of job page}`

**Response**

- `200 OK` on success
  One string containing job title and job description.

> Software Engineer - Backend Infrastructure (Toronto) Yelp’s mission is to connect users with great local businesses. We are an agile team that creates an amazing experience for millions of people and business owners. We are growing our engineering teams to build, experiment and iterate on new product offerings and improve user experience. One of our challenges is to assist our high velocity engineering ...

- `400 Bad Request` if url not supported
- `401 Unauthorized` on bad API key
- `404 Not Found` if job title and/or job description non existant on webpage
- `500 Internal Server Error` if unable to scrape job description from url
