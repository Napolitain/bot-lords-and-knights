/* Main entry of the microkernel based BOT for Lords and Knights
 * https://stackoverflow.com/questions/46346564/how-to-split-code-in-multiple-files-in-node-js
 */

(async () => {
   const common = require('./modules/common');
   const fillLogin = require('./modules/fillLogin');

   await common.init();

   await fillLogin.precise();
   if (fillLogin.login !== 'precise') {
      await fillLogin.try();
   }


})();
