const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 3000;

const GOOGLE_KEY = "AIzaSyDKVPrwsH3SWW76rfDggnt7cDOFX3z23aA";
const N_CLIENT_ID = "NmJASo9kFFFf8r73tMeR";
const N_CLIENT_SECRET = "TDdmt7TXo8";

app.use(express.json());
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/index.html'));
})

app.post('/getLocalNews', (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=ko`;

    axios.get(locUrl).then(response => {
        if (response.status === 200) {
            const area = JSON.stringify(response.data.results[0].address_components[2].long_name);
            const newsUrl = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(area);
            try {
                axios.get(newsUrl, {
                    headers: {
                        'X-Naver-Client-Id': N_CLIENT_ID,
                        'X-Naver-Client-Secret': N_CLIENT_SECRET
                    }
                }).then(response => {
                    res.send(response.data);
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Unable to fetch geo-info", response.status);
        }
    })
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
})