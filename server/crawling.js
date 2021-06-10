const puppeteer = require('puppeteer');

const selector = '.petition_list li .bl_subject a';

const getPetition = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (request.resourceType() === 'image') request.abort();
      else if (request.resourceType() === 'stylesheet') request.abort();
      else if (request.resourceType() === 'font') request.abort();
      else request.continue();
    });
    
    const petitions = await getPetitionByPage(page);
    
    await browser.close();

    return petitions;
  };

const getPetitionByPage = async (page) => {
    await page.goto(`https://www1.president.go.kr/petitions/?c=0&only=0&page=1&order=2`);
    await page.waitForSelector(selector);
    const petitionTitle = await page.$$eval(selector, 
    (subjects) => subjects.map(el => el.innerText.substring(3)));

    return petitionTitle;
}

module.exports = getPetition;