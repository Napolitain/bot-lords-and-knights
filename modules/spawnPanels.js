const common = require('./common');
//const autocorrect = require('./autocorrect');

common.spawnPanels = async () => {
	await common.page.waitFor('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div', {timeout: 120000});
	await common.page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW', {timeout: 120000});
	await autocorrect.buttonRedAccept();
	await common.page.evaluate(() => {
		document.querySelector('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW').click();
		document.querySelector('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div').click();
		console.log("3 - spawnPanels completed");
	});
};

module.exports = common.spawnPanels;