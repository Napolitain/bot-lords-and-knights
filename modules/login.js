const common = require('./common');

common.login = {};

/**
 * Fill login with application parameters email and password
 * @param email process.argv[2]
 * @param password process.argv[3]
 * @returns {Promise<void>} ignored
 */
common.login.fill = async (email, password) => {
    await common.page.waitFor("button");
    await common.page.evaluate((email, password) => {
        document.querySelector("[name='login-name']").value = email;
        document.querySelector("[name='login-password']").value = password;
        document.querySelector("button").click();
        console.log("1 - login.fill()");
    }, email, password);

};

/**
 * Bypass login with direct play button (in case we are not logged out)
 * @returns {Promise<void>} ignored
 */
common.login.directPlay = async () => {
    await common.page.reload();
    await common.page.waitFor('button.button.button-direct-play');
    await common.page.evaluate(() => {
        let event = document.querySelector('button.button.button-direct-play');
        if (event != null) {
            event.click();
            console.log("1 - login.directPlay()");
        } else {
            common.todo = "common.init";
        }
    });
    common.todo = "submitWorlds.precise";
};

module.exports = common.login;
