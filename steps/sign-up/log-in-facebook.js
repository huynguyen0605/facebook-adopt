const emailFace = ["alexgootvn3@gmail.com"];
const passFacebook = ["nguyenvanquanghuy"];
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
// const createIconigtoPage = require("../utils/create-incognito-browser");
// puppeteer.use(StealthPlugin());

const logInFacebook = async (page) => {
  const selectEmailFace = `[placeholder='Mobile number or email address']`;
  const waitEmailTypingAppear = await page.$(selectEmailFace);
  if (waitEmailTypingAppear !== null) {
    await page.focus(selectEmailFace);
    await page.type(selectEmailFace, emailFace);
  }
  const selectPassword = `[placeholder='Password']`;
  const waitPasswordTypingAppear = await page.$(selectPassword);
  if (waitPasswordTypingAppear !== null) {
    // await page.waitForSelector(selectPassword);
    await page.focus(selectPassword);
    await page.type(selectPassword, passFacebook);
  }
  const [button] = await page.$x("//button[contains(., 'Log In')]");

  if (button) {
    await button.click();
  }

  const [buttonConfirm] = await page.$x("//button[contains(., 'OK')]");

  if (buttonConfirm) {
    await buttonConfirm.click();
  }

  // await page.waitForNavigation();

  // Scroll to the bottom of the page
  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });

  const [createAccount] = await page.$x(
    "//a[contains(., 'Create New Account')]"
  );

  if (createAccount) {
    await page.click('[data-sigil="login_profile_form"]');
    await page.waitForNavigation();
  }

  const [buttonLogIn] = await page.$x("//button[contains(., 'Log in')]");

  if (buttonLogIn) {
    await page.focus('[data-sigil="password-plain-text-toggle-input"]');
    await page.type(
      '[data-sigil="password-plain-text-toggle-input"]',
      passFacebook
    );
    await buttonLogIn.click();
  }

  // await page.focus(`[name='Search']`);
  // await page.type(`[name='Search']`, "dien may thien nam hoa");

  // await page.waitForSelector('#u_0_3');
  // // Click the "Like" button
  // await page.click('#u_0_3');
  // likePage('https://m.facebook.com/DienMayThienNamHoa.Online/?paipv=0&eav=AfYLsa5SDN84Btpi2x-WNDQ5VavAd_m_3nLgTR1w9XKT9_2mKjfcVTo7T-cmBLstncA');

  // Close the browser
  // await page.waitForSelector('.class_name');
  // const page = await createIconigtoPage(context);
  // page.setViewport({ width: 1280, height: 720 });
  // await page.goto("https://facebook.com", { waitUntil: "networkidle2" });

  // return page;
  //git
};

module.exports = logInFacebook;
