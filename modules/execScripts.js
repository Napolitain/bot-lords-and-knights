const common = require('./common');
const fn = require('./fn');
const autocorrect = require('./autocorrect');

let execScripts = {};

execScripts.gatherData = async () => {
	await common.page.waitFor('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
	await common.page.waitFor('.tabular-cell--upgrade-building');
	await autocorrect.buttonRedAccept();
	common.castles = await common.page.evaluate(() => {
		let data = {};

		// get castle resources
		let castles = document.querySelectorAll('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
		for (let castle of castles) {
			let name = castle.querySelector('.habitat-overview-title--habitat-name').innerHTML;
			data[name] = {};
			data[name].points = castle.querySelector('.habitat-overview-title--habitat-points').innerHTML;
			let goods = castle.querySelectorAll('.amount'); // the first 6 are sure to be in that order
			data[name].wood = goods[0].innerHTML;
			data[name].stone = goods[1].innerHTML;
			data[name].ore = goods[2].innerHTML;
			data[name].subjects = goods[3].innerHTML;
			data[name].copper = goods[4].innerHTML;
			data[name].silver = goods[5].innerHTML;
		}

		// get buildings levels
		castles = document.querySelectorAll('.tabular.table--global-overview.table--global-overview--buildings');
		for (let castle of castles) {
			let name = castle.querySelector('.tabular-habitat-title-cell--habitat-title').innerHTML;
			data[name]['buildings'] = {};
			let buildings = castle.querySelectorAll('.upgrade-building--cell');
			data[name]['buildings'].keep = buildings[0].querySelector('div').innerHTML;
			data[name]['buildings'].arsenal = buildings[1].querySelector('div').innerHTML;
			data[name]['buildings'].tavern = buildings[2].querySelector('div').innerHTML;
			data[name]['buildings'].library = buildings[3].querySelector('div').innerHTML;
			data[name]['buildings'].fortification = buildings[4].querySelector('div').innerHTML;
			data[name]['buildings'].market = buildings[5].querySelector('div').innerHTML;
			data[name]['buildings'].farm = buildings[6].querySelector('div').innerHTML;
			data[name]['buildings'].lumberjack = buildings[7].querySelector('div').innerHTML;
			data[name]['buildings'].woodstore = buildings[8].querySelector('div').innerHTML;
			data[name]['buildings'].quarry = buildings[9].querySelector('div').innerHTML;
			data[name]['buildings'].stonestore = buildings[10].querySelector('div').innerHTML;
			data[name]['buildings'].oremine = buildings[11].querySelector('div').innerHTML;
			data[name]['buildings'].orestore = buildings[12].querySelector('div').innerHTML;
		}
		console.log('4 - execScripts.gatherData() completed');
		return data;
	});
};

execScripts.build = async () => {
	for (const [key, value] of Object.entries(common.castles)) {
		let algorithm = fn.getConfig(value['points']);
		await common.page.evaluate((fill) => {
			if (fill) {
				let castles = document.querySelectorAll('.tabular.table--global-overview.table--global-overview--buildings');
				for (let castle of castles) {
					castle.querySelector('button').click();
				}
			} else {
				let r = Math.floor((Math.random() * algorithm))
			}
		}, algorithm.fill === true);
	}
};

module.exports = execScripts;