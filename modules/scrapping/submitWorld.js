let common = require('../common');
common.spawnPanels = require('./spawnPanels');

common.submitWorld = async () => {
	await common.page.waitFor("#choose-world-scene div:nth-child(1)");
	// TODO: sometimes, world isn't available (pop-up); try again
	await common.io.click('#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)');
	console.log("2 - submitWorld completed");
	await common.spawnPanels();
};

module.exports = common.submitWorld;
