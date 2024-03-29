const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {DOMParser: dom} = require("xmldom");
const xpath = require("xpath");
const url = 'https://www.nba.com/players';
const imageDirectory = 'src/assets/Headshots';

// Automated script to select 'All' option in dropdown so that all headshots and players can be retrieved
export async function selectAndScrapeAllPlayers() {
  const browser = await puppeteer.launch({headless: false, args:['--start-maximized']});
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport({width: 1920, height: 1080});

  const DropdownSelectorPath = '#__next > div.Layout_base__6IeUC.Layout_justNav__2H4H0.Layout_withSubNav__ByKRF > div.Layout_mainContent__jXliI > main > div.MaxWidthContainer_mwc__ID5AG > section > div > div.PlayerList_content__kwT7z > div.PlayerList_filters__n_6IL > div.PlayerList_pagination__c5ijE > div > div.Pagination_pageDropdown__KgjBU > div > label > div > select'
  await page.waitForSelector(DropdownSelectorPath);
  console.log("Dropdown found, preparing to select option...")
  await page.click(DropdownSelectorPath);
  await page.select(DropdownSelectorPath, 'All');

  // Run scraper after changing selector to show all players
  setTimeout(async () => {
    // const html = await page.content()
    // const html = await page.evaluate(() => document.querySelector('*').innerHTML);
    await scrapePlayers().catch((error) => console.log(error));
  }, 3000)

}

// Scrape player headshots and list of active players (all this because there's no free api sadly)
async function scrapePlayers() {
  try {
    if (!fs.existsSync(imageDirectory)) {
      fs.mkdirSync(imageDirectory);
    }

    let activePlayersList = []
    const response = await axios.get(url)
    const html = response.data;
    const doc = new dom().parseFromString(html, 'text/html');

    // Define XPath to select player image
    const playerImagesXpath = '/html/body/div[1]/div[2]/div[2]/main/div[2]/section/div/div[2]/div[2]/div/div/div/table/tbody/tr/td/a/div/img';
    const playerImageNodes = xpath.select(playerImagesXpath, doc);

    // Iterate over player image elements
    for (let i = 0; i < playerImageNodes.length; i++) {
      const imageUrl = playerImageNodes[i].getAttribute('src');
      let imageName = playerImageNodes[i].getAttribute('alt');
      imageName = imageName.split(' ').slice(0,2).join('');       // Name file after player
      let playerName = imageName.split(' ').slice(0,2).join(' ');
      activePlayersList.push(playerName)                          // Also push name to active players list
      await downloadImage(imageUrl, imageName);
    }
  } catch (error) {
    console.error(`Error scraping players: ${error.message}`);
  }
}

// Subroutine to download each headshot image
async function downloadImage(imageUrl, imageName) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(path.join(imageDirectory, imageName + '.png'), response.data);
    console.log(`Downloaded image for ${imageName}`);
  } catch (error) {
    console.error(`Error downloading image for ${imageName}: ${error.message}`);
  }
}

// Grab all the file names and add them to an array
async function retrieveFileNames() {
  try {
    const files = await fs.readdir(imageDirectory);
    const fileNames = files.map(file => String(file));
    console.log('File names:', fileNames);
  } catch (error) {
    console.error('Error reading files:', error);
  }
}
