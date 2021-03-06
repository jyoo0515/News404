const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const PORT = process.env.PORT || 3000;
const getPetition = require('./petition.js');
const getMean = require('./wiki.js');

const GOOGLE_KEY = "AIzaSyDKVPrwsH3SWW76rfDggnt7cDOFX3z23aA";
const N_CLIENT_ID = "NmJASo9kFFFf8r73tMeR";
const N_CLIENT_SECRET = "TDdmt7TXo8";
const headers = {
    'X-Naver-Client-Id': N_CLIENT_ID,
    'X-Naver-Client-Secret': N_CLIENT_SECRET
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "/../client")));

app.get('/', (req, res) => {
    res.sendFile("index.html"); 
});

app.post('/getLocalNews', (req, res) => {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const locUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_KEY}&language=ko`;

    axios.get(locUrl).then(response => {
        if (response.status === 200) {
            const area = JSON.stringify(response.data.results[0].address_components[2].long_name);
            const newsUrl = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(area);
            try {
                axios.get(newsUrl, { headers })
                    .then(response => {
                        console.log(response.data.items);
                        res.send(response.data.items);
                    })
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("Unable to fetch geo-info", response.status);
        }
    })
});

app.get('/getHotNews', (req, res) => {
    getPetition().then(async response => {
        const promiseList = [];
        for (i = 0; i < 5; i++) {
            const newsUrl = 'https://openapi.naver.com/v1/search/news.json?display=2&query=' + encodeURI(response[i]);
            promiseList.push(axios.get(newsUrl, { headers }));
        }
        
        Promise.all(promiseList)
            .then(list => {
                res.send(list.map(news => news.data.items).flat());
            })
            .catch(err => {
                console.log(err.message);
            });
    });
});

app.post('/getWiki', (req, res) => {
    const question = req.body.question;

    getMean(question)
        .then(data => res.send(data))
        .catch(err => {
            console.log(err.message);
        })
})

app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});