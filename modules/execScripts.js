const common = require('./common');

let execScripts = {};

execScripts.gatherData = async () => {
	await common.page.waitFor('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
	await common.page.evaluate(() => {
		let data = {};
		let castles = document.querySelectorAll('#menu-section-general-container > div > div.menu--content-section > div.menu-list-element.habitat-overview--widget.clickable');
		for (let i = 0; i < castles.length; i++) {
			let name = castles[i].querySelector('.habitat-overview-title--habitat-name').innerHTML;
			data[name] = {};
			data[name].points = castles[i].querySelector('.habitat-overview-title--habitat-points').innerHTML;
			let goods = castles[i].querySelectorAll('.good');
			data[name].wood = goods[0].innerHTML;
			data[name].stone = goods[1].innerHTML;
			data[name].copper = goods[2].innerHTML;
			data[name].farms = goods[3].innerHTML;
			data[name].bronze = goods[4].innerHTML;
			data[name].silver = goods[5].innerHTML;
		}
		console.log('4 - execScripts.gatherData() completed');
		console.log(JSON.stringify(data));
	});
};

execScripts.build = async () => {

};

module.exports = execScripts;