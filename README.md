# Soundtrack to My Life

[![Build Status](https://travis-ci.org/nathanglover/soundtrack-to-my-life.svg?branch=master)](https://travis-ci.org/nathanglover/soundtrack-to-my-life) [![Coverage Status](https://coveralls.io/repos/github/nathanglover/soundtrack-to-my-life/badge.svg?branch=master)](https://coveralls.io/github/nathanglover/soundtrack-to-my-life?branch=master) 

A timeline of what I have been listening using Spotify's Web API, AWS Lambda, Mongo DB, GraphQL, and React.
<p align="center">
  <img src="https://github.com/nathanglover/soundtrack-to-my-life/blob/master/images/screenshot.png?raw=true" alt="Image of App" width="500"/>
</p>

## Why?
Music is one of my passions. Ask anyone of my friends and they will tell you that I am constantly listening to music. I have always wanted to quantify how much I am listening to, beyond Spotify's "Year in Review" feature they release at the end of the year. This project allows me to do that. 

## How it Works
This project has 3 different pieces. 
1. The data ETL process
2. A simple GraphQL API
3. A "create-react-app" frontend

### ETL

<p align="center">
  <img src="https://github.com/nathanglover/soundtrack-to-my-life/blob/9-issue/images/serverless-screenshot.png?raw=true" alt="Image of Serverless" width="500"/>
</p>

#### Extract
Every 3 minutes an AWS Lambda function hits Spotify's Web API [get-information-about-the-users-current-playback](https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/) using an access token for my own Spotify Account. The response is saved directly into an S3 Bucket, for the transform and processing job to pick up.
#### Transform & Load
Every 15 minutes an AWS Lambda function quries S3 for unprocessed records. These responses are looped through, the data is filtered to just the information the application needs, and saved into a MongoDB collection. 

#### Languages & Tools
- Python
- Pytest
- Boto3
- AWS Parameter Store
- AWS Lambda
- Serverless Framework
- MongoDB

### GraphQL API

<p align="center">
  <img src="https://github.com/nathanglover/soundtrack-to-my-life/blob/9-issue/images/graphql-screenshot.png?raw=true" alt="Image of Serverless" width="500"/>
</p>


This was my first use of GraphQL and I still have a lot to learn. The API itself only has one endpoint, the timeline, which takes a date as a parameter. The API returns a list of timeline objects from MongoDB for the given date. The API is deployed using Netlify functions to allow easy integration with the React frontend. 

#### Languages & Tools
- Node JS
- GraphQL
- MongoDB
- Apollo Server
- Netlify Functions



### React Frontend