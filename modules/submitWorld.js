const common = require('./common');

let submitWorld = {done: false};

submitWorld.precise = async () => {
	await common.page.waitFor("#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)");
	await common.page.evaluate(() => {
		document.querySelector('#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)').click();
		console.log("2 - submitWorld completed")
	});
};

module.exports = submitWorld;