(async () => {
   const common = require('./modules/common');
   const fillLogin = require('./modules/fillLogin');

   await common.init();
   await fillLogin.precise();
})();
