const common = require('./common');

let autocorrect = {};

/**
 * Accept an event with red accept button
 * @returns {Promise<void>} ignored
 */
autocorrect.buttonRedAccept = async () => {
	await common.page.evaluate(() => {
		let event = document.querySelector("div.event-pop-up-button.ButtonRedAccept");
		if (event != null) {
			event.click();
			console.log("autocorrect.buttonRedAccept closed an event pop-up");
		}
	});
};

module.exports = autocorrect;