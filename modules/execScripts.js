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
			data[name].buildings = {};
			let buildings = castle.querySelectorAll('.upgrade-building--cell');
			data[name].buildings.keep = buildings[0].querySelector('div').innerHTML;
			data[name].buildings.arsenal = buildings[1].querySelector('div').innerHTML;
			data[name].buildings.tavern = buildings[2].querySelector('div').innerHTML;
			data[name].buildings.library = buildings[3].querySelector('div').innerHTML;
			data[name].buildings.fortification = buildings[4].querySelector('div').innerHTML;
			data[name].buildings.market = buildings[5].querySelector('div').innerHTML;
			data[name].buildings.farm = buildings[6].querySelector('div').innerHTML;
			data[name].buildings.lumberjack = buildings[7].querySelector('div').innerHTML;
			data[name].buildings.woodstore = buildings[8].querySelector('div').innerHTML;
			data[name].buildings.quarry = buildings[9].querySelector('div').innerHTML;
			data[name].buildings.stonestore = buildings[10].querySelector('div').innerHTML;
			data[name].buildings.oremine = buildings[11].querySelector('div').innerHTML;
			data[name].buildings.orestore = buildings[12].querySelector('div').innerHTML;
		}
		console.log('4 - execScripts.gatherData() completed');
		return data;
	});
};

execScripts.build = async () => {
	await common.page.evaluate((json, getAlgorithm) => {
		let castles = document.querySelectorAll('.tabular.table--global-overview.table--global-overview--buildings');
		for (let castle of castles) {
			let name = castle.querySelector('.tabular-habitat-title-cell--habitat-title').innerHTML;
			let algorithm = getAlgorithm(json[name].points);
			if (algorithm['fill'] === true) {
				castle.querySelector('button').click();
			} else {
				let buttons = castle.querySelectorAll('button');
				let r = Math.floor((Math.random() * algorithm['rate_on']) + 1);
				if (r < algorithm['dun_rate']) {
					buttons[0].click();
				} else if (r < algorithm['army_rate'] && r >= algorithm['dun_rate']) {
					buttons[1].click();
				} else if (r < algorithm['tav_rate'] && r >= algorithm['army_rate']) {
					buttons[2].click();
				} else if (r < algorithm['lib_rate'] && r >= algorithm['tav_rate']) {
					buttons[3].click();
				} else if (r < algorithm['fort_rate'] && r >= algorithm['lib_rate']) {
					buttons[4].click();
				} else if (r < algorithm['market_rate'] && r >= algorithm['fort_rate']) {
					buttons[5].click();
				} else if (r < algorithm['farms_rate'] && r >= algorithm['market_rate']) {
					buttons[6].click();
				} else if (r < algorithm['ress_rate'] && r >= algorithm['farms_rate']) { //prod and storage
					var prod = [buildingsList[i].slice(7)[0], buildingsList[i].slice(7)[2], buildingsList[i].slice(7)[4]];
					var store = [buildingsList[i].slice(7)[1], buildingsList[i].slice(7)[3], buildingsList[i].slice(7)[5]];
					if (((prod.reduce(add, 0) - store.reduce(add, 0)) < 18) && store.reduce(add, 0) !== 60) {
						var k = prod.indexOf(Array.min(prod));
						pathsList[i].children().eq(7+2*k).children().eq(2).click(); // $('div[data-habitat='+pathsList[i]+'].building .button .buildbutton').eq(7+2*k).children().eq(2).click(); //commented is modern version
					} else {
						var k = store.indexOf(Array.min(store));
						pathsList[i].children().eq(8+2*k).children().eq(2).click(); // $('div[data-habitat='+pathsList[i]+'].building .button .buildbutton').eq(8+2*k).children().eq(2).click(); //
					}
				}
			}
		}
	}, common.castles, fn.getAlgorithm);
};

module.exports = execScripts;