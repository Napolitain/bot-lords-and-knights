let common = require('../common');
common.execScripts = require('./execScripts');
common.autocorrect = require('./autocorrect');

common.spawnPanels = async () => {
	await common.autocorrect.worldUnavailable();
	await common.page.waitFor('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div', {timeout: 120000});
	await common.page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW', {timeout: 120000});
	//await autocorrect.buttonRedAccept();
	await common.io.click('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW');
	await common.io.click('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div');
	console.log("3 - spawnPanels completed");
	await common.execScripts.gatherData();
};

module.exports = common.spawnPanels;