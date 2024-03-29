const puppeteer = require('puppeteer');
const fs = require('fs');

let common = {retry: 0};

common.config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

/**
 * init function which
 * - launch chromium cache free and cookie free
 * - set viewPort, userAgent
 * - goto URL
 */
common.init = async () => {
    common.browser = await puppeteer.launch({headless: false});
    common.page = await common.browser.newPage();

    common.page.setViewport({width: 1920, height: 1080});
    common.page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36");

    common.page.on("dialog", async dialog => {
        await dialog.dismiss();
    });

    common.page.on("console", function(data) {
        if (data.type() === "log") {
            console.log(data.text());
        }
    });

    await common.page.goto('https://lordsandknights.com');
};

common.restart = async () => {
    await common.browser.close();
    await common.init();
};

common.resume = async (next) => {
    // TODO: disable JS, reload, wait, enable JS and reload
    common.page.reload();
    setTimeout(common.login.directPlay, next * 1000);
};

module.exports = common;