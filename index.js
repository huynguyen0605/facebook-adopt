// const clickSignUp = require("./steps/sign-up/click-sign-up");
// const fillSignUpForm = require("./steps/sign-up/fill-sign-up-form");
// const openFacebook = require("./steps/sign-up/open-facebook");
// const createIconigtoPage = require("./steps/utils/create-incognito-browser");
const puppeteer = require("puppeteer-core");
const GoLogin = require("gologin");
const logInFacebook = require("./steps/sign-up/log-in-facebook");
const operateFacebook = require("./steps/sign-up/operate-facebook");
const scrollFaceBook = require("./steps/behavior/scroll");

(async () => {
  try {
    const GL = new GoLogin({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2FmZTQ0OTZkYmE1OTEyNDM0ZDRlNTUiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2M2FmZTRjMDJkZjBiZjYyOTg4YjU5ZmMifQ.MiUX28lvBvLfpKNw_p0dTG7mmutXyP2Av8zpp5cU25U",
      profile_id: "63afe4496dba5940384d4e6e",
    });

    const { status, wsUrl } = await GL.start().catch((e) => {
      console.trace(e);
      return { status: "failure" };
    });

    if (status !== "success") {
      console.log("Invalid status");
      return;
    }

    const browser = await puppeteer.connect({
      browserWSEndpoint: wsUrl.toString(),
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.goto("https://m.facebook.com");
    console.log(await page.content());

    await logInFacebook(page);

    // await scrollFaceBook(page, 400);

    await operateFacebook(page);

    // await browser.close();
    await GL.stop();
  } catch (error) {
    console.log("huynvq::=======>error", error.stack);
  }
})();
