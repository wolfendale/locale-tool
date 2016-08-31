const _ = require('lodash');
const fs = require('graceful-fs');
const mustache = require('mustache');

const view = fs.readFileSync(__dirname + '/values.md', 'UTF-8');

module.exports.analyser = (entries) => {
  
  const analysed = entries.reduce( (m, [key, value]) => {

    const keys = m[value] || [];

    const n = {
      [value]: _.concat(keys, key)
    };

    return _.merge(m, n);
  }, {});

   return _.reduce(analysed, (m, keys, v) => {

     let result;

     if (keys.length > 1) {
       result =
       { type: 'duplicate-value', data: { value: v, keys: keys } };
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
