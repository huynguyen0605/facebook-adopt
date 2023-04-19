const puppeteer = require('puppeteer');

const toolRunGologin = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load .js as a module
  const getProfile = require('./get-profile.js');
  const downloadFonts = require('./download-fonts.js');
  const downloadProfile = require('./download-profile.js');
  const deleteProfile = require('./delete-profile.js');

  // Call the exported function and pass in the page object
  // await getProfile(page);
  await downloadFonts(page);
  // await downloadProfile(page);

  // await deleteProfile(page);

  await browser.close();
};

toolRunGologin();