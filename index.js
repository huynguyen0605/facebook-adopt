// const clickSignUp = require("./steps/sign-up/click-sign-up");
// const fillSignUpForm = require("./steps/sign-up/fill-sign-up-form");
// const openFacebook = require("./steps/sign-up/open-facebook");
// const createIconigtoPage = require("./steps/utils/create-incognito-browser");
const puppeteer = require("puppeteer-core");
const GoLogin = require("gologin");
const logInFacebook = require("./steps/sign-up/log-in-facebook");
const operateFacebook = require("./steps/sign-up/operate-facebook");

(async () => {
  try {
    const GL = new GoLogin({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzllODIyNTRjYjkwYzg3ODEyYWNlNDYiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2MzllODI2NzFhNjBiNDFmNjJkYjU2YzcifQ.2tKIobCgIrCaUpZlSGq3mqGENjYzhR25sSF2KQV1clA",
      profile_id: "639e82254cb90ccf212ace72",
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

    await operateFacebook(page);

    // await browser.close();
    await GL.stop();
  } catch (error) {
    console.log("huynvq::=======>error", error.stack);
  }
})();
