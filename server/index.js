const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.get('/location', (req, res) => {
    // let options = {
    //     url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${GOOGLE_KEY}&language=ko`
    // };
    // request.get(options, (error, response, body) => {
    //     if (!error && response.statusCode == 200) {
    //         res.send(body);
    //     } else {
    //         res.status(response.statusCode).end();
    //         console.log('Geolocation Error: ' + response.statusCode);
    //     }
    // });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})