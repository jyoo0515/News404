const request = require('request');
const cheerio = require('cheerio');

const fetchPetition = () => {
    request({url: "https://www1.president.go.kr/petitions/?c=0&only=1&page=1&order=2", encoding: "utf8"}, (err, res, body) => {
        const $ = cheerio.load(body);
        const petitionList = $('.petition_list');
        const petitions = petitionList.children('li div');
        console.log(petitions);
    })
}

fetchPetition()