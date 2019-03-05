const puppeteer = require("puppeteer");
const fs = require("fs");

const config = JSON.parse(fs.read("config.json"));

(async () => {
    // declaration
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    // configuration
    page.setViewport({width: 1920, height: 1080});
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36");
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    page.on("console", function(data) {
        if (data.type() === "log") {
            console.log(data.text());
        }
    });

    await page.goto("https://lordsandknights.com/", {waitUntil: "networkidle2"});

    // 1 - fillLogin
    await page.waitFor("button");
    await page.evaluate(() => {
        document.querySelector("[name='login-name']").value = "lordk@mail.com";
        document.querySelector("[name='login-password']").value = "your_password";
        document.querySelector("button").click();
        console.log("1 - fillLogin completed");
    });
    await page.screenshot({path: "logs/screen-1-login.png"});

    // 2 - submitWorld
    await page.waitFor("#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)");
    await page.evaluate(() => {
        document.querySelector('#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)').click();
        console.log("2 - submitWorld completed")
    });
    await page.screenshot({path: "logs/screen-2-world.png"});

    // 3 - spawnPanels
    await page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_RECRUITMENT_OVERVIEW');
    await page.evaluate(() => {
        document.querySelector('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div').click();
        document.querySelector('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW > div').click();
    });
    await page.screenshot({path: "logs/screen-3-panels"});

    // 4 - execScripts
    await page.waitFor('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
    await page.evaluate(() => {

        let castles = document.querySelector('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');

    });

    await browser.close();
})();
