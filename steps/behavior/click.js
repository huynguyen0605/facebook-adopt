const clickAction = async function (ElementHandle, selector) {
  // await page.waitForTimeOut(number);
  await ElementHandle.click(selector);
};

module.exports = clickAction;
