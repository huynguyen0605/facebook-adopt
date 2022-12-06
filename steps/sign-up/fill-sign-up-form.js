const firtNameLib = ["Huy", "Hiếu", "Bình", "Linh", "Tuyên", "Trang"];
const surNameLib = ["Quang", "Trung", "Hải", "Khánh", "Đức", "Trần"];
const emailLib = ["buihieu841@gmail.com"];
const password = "123456@";
const month = ["1", "2", "3", "4", "5", "6"];
const year = ["1997", "1998", "1999", "2000", "2001", "2002"];
const gender = ["Male", "Female"];
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: "secret_C8UCm44Bg7yG6mugwzthrVwis86Ul6RVdmRnCmuKczN",
});

const requestEmailAndPass = async () => {
  const emailDatas = await notion.databases.query({
    database_id: "e401e82ee5dd4e5f9774cacff850e9db",
    filter: {
      property: "used",
      checkbox: {
        equals: false,
      },
    },
  });

  console.log(emailDatas.results[0]);

  const emailAndPassword = [];

  for (const emailData of emailDatas.results) {
    emailAndPassword.push({
      email: emailData.properties.email.email,
      password: emailData.properties.password.title[0].plain_text,
    });
  }

  console.log("huynvq::=========>email and password", emailAndPassword);
};

const randomName = (lib) => {
  const randomIndex = Math.floor(Math.random() * lib.length);

  return lib[randomIndex];
};

const randomDate = () => {
  const randomDate = Math.floor(Math.random() * 20);
  return randomDate;
};

const fillFirstName = async (page) => {
  const selectorFirstName = `[aria-label='First name']`;
  await page.waitForSelector(selectorFirstName);
  await page.focus(selectorFirstName);
  await page.type(selectorFirstName, randomName(firtNameLib));
};

const fillSurname = async (page) => {
  const selectorSurname = `[aria-label='Surname']`;

  await page.focus(selectorSurname);
  await page.type(selectorSurname, randomName(surNameLib));
};

const fillEmail = async (page) => {
  const selectorEmail = `[aria-label='Mobile number or email address']`;
  const email = randomName(emailLib);
  await page.focus(selectorEmail);
  await page.type(selectorEmail, email);
  return email;
};

const reFillEmail = async (page) => {
  const selectorEnterEmail = `[aria-label='Re-enter email address']`;
  const email = randomName(emailLib);
  await page.focus(selectorEnterEmail);
  await page.type(selectorEnterEmail, email);
};

const fillPassword = async (page) => {
  const selectorPassword = `[aria-label='New password']`;
  await page.focus(selectorPassword);
  await page.type(selectorPassword, password);
};

const selectDate = async (page) => {
  const selectorDate = `[aria-label='Day']`;
  await page.select(selectorDate, `${randomDate()}`);
};

const selectMonth = async (page) => {
  const selectMonth = `[aria-label='Month']`;
  await page.select(selectMonth, randomName(month));
};

const selectYear = async (page) => {
  const selectorYear = `[aria-label='Year']`;
  await page.select(selectorYear, randomName(year));
};

const clickGender = async (page) => {
  const sex = randomName(gender);
  const [button] = await page.$x(`//label[contains(., '${sex}')]`);

  if (button) {
    await button.click();
  }
};

const clickSignUpOnForm = async (page) => {
  const [button] = await page.$x("//button[contains(., 'Sign Up')]");

  if (button) {
    await button.click();
  }
};

const fillSignUpForm = async (page) => {
  await requestEmailAndPass();
  // await fillFirstName(page);
  // await fillSurname(page);
  // const email = await fillEmail(page);
  // await reFillEmail(page);
  // await fillPassword(page);
  // await selectDate(page);
  // await selectMonth(page);
  // await selectYear(page);
  // await clickGender(page);
  // await clickSignUpOnForm(page);
  // return email;
  // const random45 = 4 + Math.random();
  // const a = `value=${random45}`;
  // 'value=5'
  // 'value=4'
  // const selectorDateValue = `[value="13"]`; // `[value=5]`
  // await page.select(selectorDateValue);
};

module.exports = fillSignUpForm;
