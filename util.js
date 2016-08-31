const _ = require('lodash');

const compose = (...fns) => {
  return fns.reduce( (f, g) => {
    return (x) => f(g(x));
  }, _.identity);
};

const sequence = (...fns) => {
  return compose(...fns.reverse());
};

const spread = (...fns) => {
  return (x) => fns.map( (f) => {
    return f(x);
  } );
};

const lift = (fn) => {
  return (m) => m.map(fn);
};

const transduce = (fn, m) => {
  return (x) => _.reduce(x, fn, m);
};

module.exports.compose = compose;
module.exports.sequence = sequence;
module.exports.spread = spread;
module.exports.lift = lift;
module.exports.transduce = transduce;
