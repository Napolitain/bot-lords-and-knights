/* Main entry of the microkernel based BOT for Lords and Knights
 * https://stackoverflow.com/questions/46346564/how-to-split-code-in-multiple-files-in-node-js
 *
 * TODO: autoML.js
 * TODO: die and retry architecture (if script is done, start the next one, or start one or several times before)
 * TODO: there are 5 minutes free finish buildings, which could be automated
 */

(async () => {
    let common = require('./modules/common');

	common.login = require('./modules/login');
    common.submitWorld = require('./modules/submitWorld');
    common.spawnPanels = require('./modules/spawnPanels');
    common.execScripts = require('./modules/execScripts');
	common.getTimes = require('./modules/getTimes');

	const email = process.argv[2];
    const password = process.argv[3];

	await common.init();
	await common.login.fill(email, password);
	await common.submitWorld();
	await common.spawnPanels();
	await common.execScripts.gatherData();
	await common.execScripts.build();

})();
