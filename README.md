# Blue Skies
A weather app, build utilizing React

# Demo
[Link TK]

# Technologies Used
React, Javascript, Webpack, Google Maps Javascript API, Dark Sky Weather API

# How to Run a Local Copy

Download the project
`git clone`

Navigate to the project directory
`cd path/to/project`

Create an .env file in the root of the project
```
touch .env
vim .env
```

Specify your own Google Maps API Geolocation and Dark Sky API keys in the .env file
```
REACT_APP_DS_KEY=[your dark sky key here]
REACT_APP_GOOGLE_KEY=[your google maps api key here]
```

Install the project dependencies
`npm i`

Run the API server
`npm run server`

In another terminal tab, run the development server.
`npm start`

That is it! Your (default) browser should open automatically and navigate to http://localhost:3000. If it doesn't, open your browser of choice and navigate to to http://localhost:3000 manually.
