// /* eslint-disable global-require, import/no-unresolved */

// // This is a alias proxy, which will use global `@ant-design/cssinjs` first.
// // Use local if global not found.
// let cssinjs;

// if (typeof window !== 'undefined' && window.amenityCssInJs) {
//   // Use window UMD version
//   cssinjs = window.amenityCssInJs;
// } else if (typeof global !== 'undefined' && global.amenityCssInJs) {
//   // Use global UMD version
//   cssinjs = global.amenityCssInJs;
// } else {
//   // Use local version.
//   // Use relative path since webpack will also replace module here.
//   cssinjs = require('../node_modules/@ant-design/cssinjs');
// }

// module.exports = cssinjs;