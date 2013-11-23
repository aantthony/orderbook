
module.exports = require('./lib');

if (process.env.OB_COVERAGE){
  var dir = './lib-cov/';
  module.exports = require(dir);
}