let common = require('./common');

common.getTimes = async () => {
	await common.page.waitFor('.complete');
	let next = await common.page.evaluate(() => {
		/**
		 * next in seconds
		 * @type {number}
		 */
		let next = Infinity;
		let times = document.querySelectorAll('.complete');
		for (const time of times) {
			if (time.innerHTML.indexOf('<') !== -1) {
				next = 60; // next is in less than a minute
			} else if (time.innerHTML.indexOf('h') !== -1) {
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
	console.log("5 - common.getTimes() => " + next.toString());
	common.resume(next);
};

module.exports = common.getTimes;