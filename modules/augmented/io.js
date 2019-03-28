// TODO: make a class which uses page.keyboard.sendCharacter and page.click with human like delays to bypass BOT detectors (may work for reCAPTCHA?)

let common = require('../common');
common.io = {};

/**
 * Promisified version of setTimeout, so it works with await.
 * @type {promisified}
 */
common.io.setTimeout = require('util').promisify(setTimeout);

/**
 * Focus element and send characters using pseudo random algorithm : random intervals between keypresses with statistics in mind.
 * @param selector The selector to focus the element.
 * @param text The text to be sent.
 * @returns {Promise<void>}
 */
common.io.type = async (selector, text) => {
	await common.page.focus(selector);
	for (const char of text) {
		await common.io.setTimeout(Math.random() * 140 + 110); // probability of IKI (inter-key interval) being between 110 and 250ms is very high
		await common.page.keyboard.sendCharacter(char);
	}
};

/**
 * Move the cursor at a randomly changing speed to the selector, and click.
 * @param selector The selector to focus the element.
 * @returns {Promise<void>}
 */
common.io.click = async (selector) => {
	// TODO: moving the cursor to simulate a human.
	common.page.click(selector);
};

module.exports = common.io;