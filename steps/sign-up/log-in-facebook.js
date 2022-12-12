const emailFace = ["alexgootvn3@gmail.com"];
const passFacebook = ["nguyenvanquanghuy"];
// const puppeteer = require("puppeteer-extra");
// const StealthPlugin = require("puppeteer-extra-plugin-stealth");
// const { executablePath } = require("puppeteer");
// const createIconigtoPage = require("../utils/create-incognito-browser");
// puppeteer.use(StealthPlugin());

const logInFacebook = async (page) => {
  const selectEmailFace = `[placeholder='Mobile number or email address']`;
  await page.waitForSelector(selectEmailFace);
  await page.focus(selectEmailFace);
  await page.type(selectEmailFace, emailFace);

  const selectPassword = `[placeholder='Password']`;
  await page.waitForSelector(selectPassword);
  await page.focus(selectPassword);
  await page.type(selectPassword, passFacebook);

  const [button] = await page.$x("//button[contains(., 'Log In')]");

  if (button) {
    await button.click();
  }

  const [buttonConfirm] = await page.$x("//button[contains(., 'OK')]");

  if (buttonConfirm) {
    await buttonConfirm.click();
  }
  // const page = await createIconigtoPage(context);
  // page.setViewport({ width: 1280, height: 720 });
  // await page.goto("https://facebook.com", { waitUntil: "networkidle2" });

  // return page;
};

module.exports = logInFacebook;
