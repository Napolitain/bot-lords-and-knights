const common = require('./common');

let autocorrect = {};

// accept any red button (quests)
autocorrect.buttonRedAccept = async () => {
	common.page.evaluate(() => {
		let event = document.querySelector("div.event-pop-up-button.ButtonRedAccept");
		if (event != null) {
			event.click();
			console.log("autocorrect.buttonRedAccept()");
		}
	});
};

module.exports = autocorrect;