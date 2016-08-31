const _ = require('lodash');
const fs = require('graceful-fs');
const mustache = require('mustache');

const view = fs.readFileSync(__dirname + '/keys.md', 'UTF-8');

module.exports.analyser = (entries) => {

  const analysed = _.reduce(entries, (m, [key, value]) => {

    const { count, values } =
      m[key] || { count: 0, values: [] };

    const n = {
      [key]: { 
        count: count + 1,
        values: _.uniq(_.concat(values, value))
      }
    };

    return _.merge(m, n);
  }, {});

  return _.reduce(analysed, (m, { count, values }, k) => {

    const data = { key: k, values: values };

    let result;

    if (count > 1) {
      if (values.length > 1) {
        result =
          { type: 'duplicate-keys-severe', data: data };
      } else {
        result =
          { type: 'duplicate-keys', data: data };
      }
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
