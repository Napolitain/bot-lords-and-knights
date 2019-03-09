let common = require('../common');
common.login = require('./login');

common.autocorrect = {};

/**
 * Accept an event with red accept button every second asynchronously.
 * TODO: Make it work as such : every page.evaluate or any moment we need to click it first do that routine. For this, maybe use page.mouse and page.keyboard instead of evaluate, and create a wrapper which calls it.
 * @returns {Promise<void>} ignored
 */
common.autocorrect.buttonRedAccept = async () => {
	common.page.evaluate(() => {
		let event = document.querySelector("div.event-pop-up-button.ButtonRedAccept");
		if (event != null) {
			event.click();
			console.log("autocorrect.buttonRedAccept closed an event pop-up");
		}
		setTimeout(common.autocorrect.buttonRedAccept, 1000);
	});
};

/**
 * React in case the world is "unavailable". Tries to login back.
 * @returns {Promise<void>}
 */
common.autocorrect.worldUnavailable = async () => {
	try {
		await common.page.waitFor('.button.button--default', {timeout: 5000});
		console.log("common.autocorrect.worldUnavailable(): starting common.login.directPlay");
		if (common.retry !== 3) {
			common.retry++;
			await common.login.directPlay();
		} else {
			common.retry = 0;
			setTimeout(common.init, 3000000); // restart the BOT in 5 minutes if the world is really not available
		}
	} catch (e) {}
};

common.autocorrect.tutorialButton = async () => {
	// icon  icon-tutorial icon-close-button
};

module.exports = common.autocorrect;