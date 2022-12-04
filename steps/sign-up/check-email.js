const puppeteer = require("puppeteer");

const openGmail = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://facebook.com", { waitUntil: "networkidle2" });

  return page;
};

module.exports = openFacebook;
