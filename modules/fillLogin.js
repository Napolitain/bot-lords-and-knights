const common = require('./common');

let fillLogin = {};

fillLogin.precise = async (email, password) => {
    await common.page.waitFor("button");
    await common.page.evaluate((email, password) => {
        document.querySelector("[name='login-name']").value = email;
        document.querySelector("[name='login-password']").value = password;
        document.querySelector("button").click();
        console.log("1 - fillLogin completed");
    }, email, password);
};

module.exports = fillLogin;