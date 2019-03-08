/* Main entry of the microkernel based BOT for Lords and Knights
 * https://stackoverflow.com/questions/46346564/how-to-split-code-in-multiple-files-in-node-js
 *
 * TODO: autoML.js
 * TODO: die and retry architecture (if script is done, start the next one, or start one or several times before)
 * TODO: there are 5 minutes free finish buildings, which could be automated
 */

(async () => {
    const common = require('./modules/common');
    const fillLogin = require('./modules/fillLogin');
    const submitWorlds = require('./modules/submitWorld');
    const spawnPanels = require('./modules/spawnPanels');
    const execScripts = require('./modules/execScripts');
	const getTimes = require('./modules/getTimes');

    const email = process.argv[2];
    const password = process.argv[3];

	var routine = async () => {
		await common.init();
		await fillLogin.precise(email, password);
		await submitWorlds.precise();
		await spawnPanels.precise();
		await execScripts.gatherData();
		await execScripts.build();
		await getTimes.precise();
		setTimeout(routine, common.next);
	};
})();
