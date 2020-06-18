const compose = (...fns) => value =>
  fns.reduce((previousValue, fn) =>
    fn(previousValue), value);

module.exports = {compose};