const puppeteer = require('puppeteer');

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
    
    const petitions = [].concat(await getPetitionByPage(page, 1), await getPetitionByPage(page, 2));
    
    await browser.close();

    return petitions;
  };

const getPetitionByPage = async (page, pageNum) => {
    await page.goto(`https://www1.president.go.kr/petitions/?c=0&only=0&page=${pageNum}&order=2`);
    const petitionTitle = await page.$$eval('.petition_list li .bl_subject a', 
    (subjects) => subjects.map(el => el.innerText.substring(3)));

    return petitionTitle
}

module.exports = getPetition;