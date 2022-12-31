const waitAction = async function (page) {
  try {
    await page.waitForNavigation({ timeout: 5000 });
  } catch (error) {
    console.log("error navigation", error);
  }
};

module.exports = waitAction;
