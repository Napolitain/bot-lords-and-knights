const common = require('./common');

let autocorrect = {};

/**
 * Accept an event with red accept button every second asynchronously.
 * TODO: Make it work as such : every page.evaluate or any moment we need to click it first do that routine. For this, maybe use page.mouse and page.keyboard instead of evaluate, and create a wrapper which calls it.
 * @returns {Promise<void>} ignored
 */
autocorrect.buttonRedAccept = async () => {
	common.page.evaluate(() => {
		let event = document.querySelector("div.event-pop-up-button.ButtonRedAccept");
		if (event != null) {
			event.click();
			console.log("autocorrect.buttonRedAccept closed an event pop-up");
		}
		setTimeout(autocorrect.buttonRedAccept, 1000);
	});
};

module.exports = autocorrect;