const _ = require('lodash');
const fs = require('graceful-fs');
const mustache = require('mustache');

const view = fs.readFileSync(__dirname + '/markup.md', 'UTF-8');

module.exports.analyser = (entries) => {

  return _.reduce(entries, (m, [key, value]) => {

    let result;

    if (/<.+>.*<\/.+>/g.test(value)) {
      result =
        { type: 'full-tag', data: { key: key, value: value } };
    }  else if (/<.+>/g.test(value)) {
      result =
        { type: 'partial-tag', data: { key: key, value: value } };
    } else {
      result = [];
    }

    return _.concat(m, result);
  }, []);
};

module.exports.reporter = (events) => {
  const data = _.map(events, 'data');
  return mustache.render(view, { errors: data, display: data.length > 0 });
};
