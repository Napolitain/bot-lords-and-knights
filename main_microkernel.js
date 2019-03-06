/* Main entry of the microkernel based BOT for Lords and Knights
 * https://stackoverflow.com/questions/46346564/how-to-split-code-in-multiple-files-in-node-js
 */

(async () => {
    const common = require('./modules/common');
    const fillLogin = require('./modules/fillLogin');
    const submitWorlds = require('./modules/submitWorld');
    const spawnPanels = require('./modules/spawnPanels');
    const execScripts = require('./modules/execScripts');

    await common.init();
    await fillLogin.precise();
	await submitWorlds.precise();
	await spawnPanels.precise();
	await execScripts.gatherData();
	await execScripts.build();
})();
