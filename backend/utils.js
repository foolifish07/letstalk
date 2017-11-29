module.exports.isString = (v) => {
  return (typeof v) === 'string';
}

module.exports.isNumber = (v) => {
  return (typeof v) === 'number';
}

module.exports.isObject = (v) => {
  return (typeof v) === 'object'
      && v !== undefined
      && v !== null;
}

module.exports.isArray = (v) => {
  return Array.isArray(v);
}

module.exports.isFunction = (v) => {
  return (typeof v) === 'function'
}
