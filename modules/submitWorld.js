const common = require('./common');

common.submitWorld = () => {
	common.page.waitFor("#choose-world-scene div:nth-child(1)");
	common.page.evaluate(() => {
		// TODO: sometimes, world isn't available (pop-up); try again
		document.querySelector('#choose-world-scene > div:nth-child(2) > div.choose-world-scene--buttons-list > div:nth-child(1)').click();
		console.log("2 - submitWorld completed")
	});
};

module.exports = common.submitWorld;
