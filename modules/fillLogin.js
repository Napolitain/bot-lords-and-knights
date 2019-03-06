const common = require('./common')

let fillLogin = {};

/**
 * Precise way to authenticate the user
 * @returns {Promise<void>}
 */
fillLogin.precise = async () => {
    await common.page.waitFor("button");
    await common.page.evaluate(() => {
        document.querySelector("[name='login-name']").value = "lordk@mail.com";
        document.querySelector("[name='login-password']").value = "your_password";
        document.querySelector("button").click();
        console.log("1 - fillLogin completed");
    });
};

/**
 * Second way to authenticate the user if the precise didn't work.
 * @returns {Promise<void>}
 */
fillLogin.try = async () => {
    await common.page.evaluate(() => {
        document.querySelector("form input:nth-child(1)").value = common.config.
    });
};

module.exports = fillLogin;