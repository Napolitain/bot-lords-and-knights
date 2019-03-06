const puppeteer = require("puppeteer");
const fs = require("fs");

const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

(async () => {
    // declaration
    const browser = await puppeteer.launch({headless: false});
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
        document.querySelector("[name='done-name']").value = "lordk@mail.com";
        document.querySelector("[name='done-password']").value = "your_password";
        document.querySelector("button").click();
        console.log("1 - fillLogin completed");
    });
    await page.screenshot({path: "logs/screen-1-done.png"});

    // 2 - submitWorld
    await page.waitFor("#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)");
    await page.evaluate(() => {
        document.querySelector('#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)').click();
        console.log("2 - submitWorld completed")
    });
    await page.screenshot({path: "logs/screen-2-world.png"});

    // 3 - spawnPanels
    await page.waitFor('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div', {timeout: 120000});
    await page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW', {timeout: 120000});
    await page.evaluate(() => {
        document.querySelector('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div').click();
        document.querySelector('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW').click();
        console.log("3 - spawnPanels completed");
    });
    await page.screenshot({path: "logs/screen-3-panels.png"});

    // 4 - execScripts
    await page.waitFor('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
    await page.evaluate(() => {
        var json = {};
        let castles = document.querySelector('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
        for (let i = 0; i < castles.length; i++) {
            let name = castles[i].querySelector('.habitat-overview-title--habitat-name').innerHTML;
            json[name] = {};
            json[name].points = castles[i].querySelector('.habitat-overview-title--habitat-points').innerHTML;
            json[name].wood = castles[i].querySelector('.good:nth-child(1)').innerHTML;
            json[name].stone = castles[i].querySelector('.good:nth-child(2)').innerHTML;
            json[name].copper = castles[i].querySelector('.good:nth-child(3)').innerHTML;
            json[name].farms = castles[i].querySelector('.good:nth-child(4)').innerHTML;
            json[name].bronze = castles[i].querySelector('.good:nth-child(5)').innerHTML;
            json[name].silver = castles[i].querySelector('.good:nth-child(6)').innerHTML;
        }
        console.log(JSON.stringify(json));
    });

    await browser.close();
})();
