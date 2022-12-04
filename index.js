const clickSignUp = require("./steps/sign-up/click-sign-up");
const fillSignUpForm = require("./steps/sign-up/fill-sign-up-form");
const openFacebook = require("./steps/sign-up/open-facebook");
const createIconigtoPage = require("./steps/utils/create-incognito-browser");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const { executablePath } = require("puppeteer");

const createBrowser = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: false,
    executablePath: executablePath(),
  });
  return browser;
};

const createContext = async (browser) => {
  const context = await browser.createIncognitoBrowserContext();
  return context;
};

(async () => {
  try {
    const browser = await createBrowser();
    const context = await createContext(browser);

    const page = await openFacebook(context);

    await clickSignUp(page);

    const email = await fillSignUpForm(page);
    const pageGmail = await createIconigtoPage(context);
    pageGmail.setViewport({ width: 1280, height: 720 });
    await pageGmail.goto("https://gmail.com", { waitUntil: "networkidle2" });
    const selectorEmail = `[aria-label='Email or phone']`;
    await pageGmail.waitForSelector(selectorEmail);
    await pageGmail.focus(selectorEmail);
    await pageGmail.type(selectorEmail, email);
    const [button] = await pageGmail.$x("//span[contains(., 'Next')]");

    if (button) {
      await button.click();
    }
    // await pageGmail.waitForNavigation();
    await pageGmail.waitForSelector(`[aria-busy='true']`, { hidden: true });

    const fillGmailPassword = `[aria-label='Enter your password']`;
    await pageGmail.waitForSelector(fillGmailPassword);
    await pageGmail.focus(fillGmailPassword);
    await pageGmail.type(fillGmailPassword, "123");

    // await browser.close();
  } catch (error) {
    console.log("huynvq::=======>error", error.message);
  }
})();
