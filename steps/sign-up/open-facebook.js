const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");
const createIconigtoPage = require("../utils/create-incognito-browser");
puppeteer.use(StealthPlugin());

const openFacebook = async (context) => {
  const page = await createIconigtoPage(context);
  page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://facebook.com", { waitUntil: "networkidle2" });

  return page;
};

module.exports = openFacebook;
