const _ = require('lodash');
const flatten = require('flat');

const { sequence, spread, lift, transduce } = require('./util.js');
const Markup = require('./markup.js');
const Values = require('./values.js');
const Keys = require('./keys');

const toEntries = (files) => {
  return _.reduce(files, (m, n) => {
    return _.concat(m, _.entries(n));
  }, []);
};

module.exports = (program) => {

  const analysers = [
    Values.analyser,
    Keys.analyser,
    Markup.analyser
  ];

  const reporters = [
    Values.reporter,
    Keys.reporter,
    Markup.reporter
  ];

  return sequence(
      lift(flatten),
      toEntries,
      spread(...analysers),
      a => _.zipWith(a, reporters, (a, b) => {
        return b(a);
      } ),
      a => a.join('\n')
    );
};
