const common = require('./common');

let spawnPanels = {};

spawnPanels.precise = async () => {
	await common.page.waitFor('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div', {timeout: 120000});
	await common.page.waitFor('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW', {timeout: 120000});
	await common.page.evaluate(() => {
		let event = document.querySelector("#game-pop-up-layer > div > div.event-pop-up-content--container > div.event-list-buttons.columns-1 > div > div.event-pop-up-button.ButtonRedAccept");
		if (event != null) {
			event.click();
			console.log("event clicked");
		}
		document.querySelector('#game-bar-toggle > div > div.toggle-buttons--content > div > button.button.button--default.button-with-icon.button--action-big.toggle-button--GLOBAL_BUILDING_OVERVIEW').click();
		document.querySelector('#game-bar-top > div > div.bar-top--center-column > div > div.habitat-chooser--title-row > div').click();
		console.log("3 - spawnPanels completed");
	});
};

module.exports = spawnPanels;