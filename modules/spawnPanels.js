const common = require('./common');

let spawnPanels = {};

spawnPanels.precise = async () => {
	await page.waitFor('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div', {timeout: 120000});
	await page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW', {timeout: 120000});
	await page.evaluate(() => {
		document.querySelector('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div').click();
		document.querySelector('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW').click();
		console.log("3 - spawnPanels completed");
	});
};

module.exports = spawnPanels;