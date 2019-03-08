const common = require('./common');

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
	await common.page.waitFor('.button.button--default', {timeout: 5000});
	await common.page.evaluate(() => {
		let event = document.querySelector("button button--default")
		if (event != null) {
			console.log()
			common.init();
		}
	});
};

module.exports = common.autocorrect;