/**
 * Creates nested groups by object properties.
 * `properties` array nest from highest(index = 0) to lowest level.
 *
 * @param {String[]} properties
 * @returns {Object}
 */
function nestGroupsBy(arr, properties) {
  properties = Array.from(properties);
  if (properties.length === 1) {
    return groupBy(arr, properties[0]);
  }
  const property = properties.shift();
  var grouped = groupBy(arr, property);
  for (let key in grouped) {
    grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
  }
  return grouped;
}

/**
 * Group objects by property.
 * `nestGroupsBy` helper method.
 *
 * @param {String} property
 * @param {Object[]} conversions
 * @returns {Object}
 */
function groupBy(conversions, property) {
  return conversions.reduce((acc, obj) => {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}

export { nestGroupsBy, groupBy };
