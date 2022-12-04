const clickSignUp = async (page) => {
  const [button] = await page.$x("//a[contains(., 'Create New Account')]");

  if (button) {
    await button.click();
  }
};

module.exports = clickSignUp;
