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

const execute = async (mailPosition) => {
  const browser = await createBrowser();
  const context = await createContext(browser);

  const page = await openFacebook(context);

  await clickSignUp(page);

  const { email, password } = await fillSignUpForm(page, mailPosition);
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
  await pageGmail.type(fillGmailPassword, password);

  const [confirmPassWord] = await pageGmail.$x("//span[contains(., 'Next')]");

  if (confirmPassWord) {
    await confirmPassWord.click();
  }

  return { pageGmail, browser };
};

(async () => {
  try {
    let i = 40;
    while (true) {
      const { pageGmail, browser } = await execute(i);
      await pageGmail.waitForTimeout(5000);
      const selectorRecover = `[aria-label='Recover account']`;

      const exists = await pageGmail
        .$eval(selectorRecover, () => true)
        .catch(() => false);
      if (exists) await browser.close();
      i++;
    }
    // await browser.close();
  } catch (error) {
    console.log("huynvq::=======>error", error.stack);
  }
})();
