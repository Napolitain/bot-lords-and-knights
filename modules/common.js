const puppeteer = require('puppeteer');
const fs = require('fs');

let common = {done: false};

common.config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

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

    // no networkidle2 because the website can be slow (useless with waitFor)
    await common.page.goto('https://lordsandknights.com');
};

module.exports = common;