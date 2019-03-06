const common = require('./common');

let fillLogin = {};

fillLogin.precise = async () => {
    await common.page.waitFor("button");
    await common.page.evaluate(() => {
        document.querySelector("[name='login-name']").value = "lordk@mail.com";
        document.querySelector("[name='login-password']").value = "your_password";
        document.querySelector("button").click();
        console.log("1 - fillLogin completed");
    });
};

module.exports = fillLogin;