const typeAction = async function (page, elementInput, letter) {
  await page.type(elementInput, letter);
  // await page.waitForTimeOut(time);
};

module.exports = typeAction;
