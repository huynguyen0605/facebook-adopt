const scrollFaceBook = async (page, distance) => {
  // await page.evaluate(() => { window.scrollTo(0, distance); });

  console.log("huynvq::=======>scrollFaceBook", page, distance);

  const scrollToDistance = (distance) => {
    window.scrollTo(0, distance);
  };

  await page.evaluate(scrollToDistance, distance);
};

module.exports = scrollFaceBook;
