// const clickSignUp = require("./steps/sign-up/click-sign-up");
// const fillSignUpForm = require("./steps/sign-up/fill-sign-up-form");
// const openFacebook = require("./steps/sign-up/open-facebook");
// const createIconigtoPage = require("./steps/utils/create-incognito-browser");
const puppeteer = require('puppeteer-core');
const GoLogin = require('gologin');


(async () => {
  try {
  const GL = new GoLogin({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Mzk0ODNiNWIyNjRjMmNkYmE4MTk5YjYiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2Mzk0ODQ5OGNlY2M4MTE4YjZhNzFkY2YifQ.wh787BM2DW0dnZP26wFa5vLTrW_OvXwFVdCZkCTE9x4',
      profile_id: '639483b5b264c2cce48199c6',
  });

  const { status, wsUrl } = await GL.start().catch((e) => {
    console.trace(e);
    return { status: 'failure' };
  });

  if (status !== 'success') {
    console.log('Invalid status');
    return;
  }

  const browser = await puppeteer.connect({
      browserWSEndpoint: wsUrl.toString(), 
      ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  await page.goto('https://myip.link/mini');   
  console.log(await page.content());
  await browser.close();
  await GL.stop();

  } catch (error) {
    console.log("huynvq::=======>error", error.stack);
  }
})();
