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
  console.log("waitEmail", waitEmailTypingAppear);
  if (waitEmailTypingAppear !== null) {
    await page.focus(selectEmailFace);
    await page.type(selectEmailFace, emailFace);
  }
  const selectPassword = `[placeholder='Password']`;
  const waitPasswordTypingAppear = await page.$(selectPassword);
  console.log("waitPass", waitPasswordTypingAppear);
  if (waitPasswordTypingAppear !== null) {
    // await page.waitForSelector(selectPassword);
    await page.focus(selectPassword);
    await page.type(selectPassword, passFacebook);
  }
  const [button] = await page.$x("//button[contains(., 'Log In')]");
  console.log("buttonLogIn", button);
  if (button) {
    await button.click();
  }

  const [buttonConfirm] = await page.$x("//button[contains(., 'OK')]");
  console.log("buttonConfirm", buttonConfirm);
  if (buttonConfirm) {
    await buttonConfirm.click();
  }

  const [createAccount] = await page.$x(
    "//a[contains(., 'Create New Account')]"
  );
  console.log("creatAcc", createAccount);
  if (createAccount) {
    await page.click('[data-sigil="login_profile_form"]');
    await page.waitForNavigation();
  }

  const [buttonLogIn] = await page.$x("//button[contains(., 'Log in')]");
  console.log("buttonLogin", buttonLogIn);
  if (buttonLogIn) {
    await page.focus('[data-sigil="password-plain-text-toggle-input"]');
    await page.type(
      '[data-sigil="password-plain-text-toggle-input"]',
      passFacebook
    );
    await buttonLogIn.click();
  }

  // try {
  //   await page.waitForNavigation();
  // } catch (error) {
  //   console.log("error navigation", error);
  // }

  // Scroll to the bottom of the page
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // const element = await page.$('a[role="button"]');
  // await element.click();

  const [watchButton] = await page.$x("//a[contains(., 'Watch')]");

  console.log("watchButton", watchButton);

  if (watchButton) {
    await watchButton.click();
  }

  try {
    await page.waitForNavigation({ timeout: 5000 });
  } catch (error) {
    console.log("error navigation", error);
  }

  const playVideo = await page.$(
    '[data-sigil="m-video-play-button playInlineVideo"]'
  );

  console.log("playVideo", playVideo);

  if (playVideo) {
    await playVideo.click();
  }

  const clickLikeButton = await page.$(
    '[data-sigil="touchable ufi-inline-like like-reaction-flyout"]'
  );

  console.log("clickLike", clickLikeButton);

  if (clickLikeButton) {
    await clickLikeButton.click();
  }

  const clickComment = await page.$(
    '[data-sigil="feed-ufi-focus feed-ufi-trigger ufiCommentLink mufi-composer-focus"]'
  );

  console.log("clickComment", clickComment);

  if (clickComment) {
    await clickComment.click();
  }

  try {
    await page.waitForNavigation({ timeout: 5000 });
  } catch (error) {
    console.log("error navigation", error);
  }

  await page.click("#composerInput");
  await page.type("#composerInput", "nice");
  await page.waitForTimeout(1000);
  const [clickPostButton] = await page.$x("//span[contains(., 'Post')]");
  console.log("clickPost", clickPostButton);
  if (clickPostButton) {
    await clickPostButton.click();
  }
  await page.click("#MBackNavBarLeftArrow");

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
