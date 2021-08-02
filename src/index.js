// ------------------------------------------------------ //
//       Ch1ll Studios Official API Wrapper               //
//                  6/26/2021                             //
// ------------------------------------------------------ //

// Modules //
const fetch = require('node-fetch');


module.exports = {
  // Main Classes //
  Client: require('./client/Client'),

  // Util //
  Util: require('./Util')
};
module.exports.init = Init;
