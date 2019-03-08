const common = require('./common');

let getTimes = {};

getTimes.precise = async () => {
	common.next = await common.page.evaluate(() => {
		/**
		 * next in seconds
		 * @type {number}
		 */
		let next = Infinity;
		let times = document.querySelectorAll('.complete');
		for (const time of times) {
			if (time.innerHTML.indexOf('<')) {
				next = 60; // next is in less than a minute
			} else if (time.innerHTML.indexOf('h')) {
				let s = parseInt(time.innerHTML.split(' ')[0]) * 3600;
				if (next > s) {
					next = s;
				}
			} else {
				let s = parseInt(time.innerHTML.split(' ')[0]) * 60;
				if (next > s) {
					next = s;
				}
			}
		}
		return next;
	});
};

module.exports = getTimes;