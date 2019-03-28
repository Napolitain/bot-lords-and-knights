// TODO: make a class which uses page.keyboard.sendCharacter and page.click with human like delays to bypass BOT detectors (may work for reCAPTCHA?)

let common = require('../common');
common.io = {};

/**
 * Focus element and send characters using pseudo random algorithm : random intervals between keypresses with statistics in mind.
 * @param selector The selector to focus the element.
 * @param text The text to be sent.
 * @returns {Promise<void>}
 */
common.io.type = async (selector, text) => {
	common.page.focus(selector);
	for (const char of text) {
		setTimeout(function () {
			common.page.keyboard.sendCharacter(char);
		}, Math.random() * 140 + 110); // probability of IKI (inter-key interval) being between 110 and 250ms is very high
	}
};