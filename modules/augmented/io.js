let common = require('../common');
common.io = {};

/**
 * Promisified version of setTimeout, so it works with await.
 * @type {promisified}
 */
common.io.setTimeout = require('util').promisify(setTimeout);

/**
 * Focus element and send characters using pseudo random algorithm : random intervals between keypresses with statistics in mind.
 * @param {selector<string>} A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
 * @param {text<string>} A text to type into a focused element.
 * @returns {Promise<void>}
 */
common.io.type = async (selector, text) => {
	// TODO: use gaussian function instead of linear random numbers
	await common.page.focus(selector);
	for (const char of text) {
		await common.io.setTimeout(Math.random() * 140 + 110); // probability of IKI (inter-key interval) being between 110 and 250ms is very high
		await common.page.type(char, {delay: Math.random() * 40 + 80}); // probability of keypress duration
	}
};

/**
 * Move the cursor at a randomly changing speed to the selector, and click.
 * @param {selector<string>} A selector to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
 * @returns {Promise<void>}
 */
common.io.click = async (selector) => {
	// TODO: use gaussian function instead of linear random numbers
	// TODO: moving the cursor to simulate a human.
	await common.page.click(selector, {delay: Math.random() * 120 + 60}); // probability of mousedown-mouseup interval
};

module.exports = common.io;