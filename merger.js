const _ = require('lodash');
const sortObj = require('deep-sort-object');
const yaml = require('js-yaml');

const { sequence, spread, lift, transduce } = require('./util.js');

// TODO: Add a pre-merge report and fail on errors.
module.exports = (program) => {

  const sort = program.sort ? sortObj : _.identity;

  return sequence(
      transduce(_.merge, {}),
      sort,
      yaml.safeDump
    );
};
