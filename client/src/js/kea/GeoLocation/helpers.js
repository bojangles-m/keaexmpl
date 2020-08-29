import geokdbush from 'geokdbush';
import kdbush from 'kdbush';

const index = cities =>
  new kdbush(
    cities,
    p => p.lon,
    p => p.lat,
  );

/**
 * Returns near by cities from the cords
 * @param {Array} cities - array of obejcts with property lat & lon
 * @param {Object} cords - { latitude, longitude }
 * @param {Number} limit - max output number of found cities
 * @param {Number} distance [km] - max radius to search for
 * @return {Array} array of objects
 */
export const nearByCities = (cities, cords, limit, distance) => {
  const { latitude, longitude } = cords;

  if (isNaN(longitude) || isNaN(latitude)) {
    throw 'function requires an object with `latitude` and `longitude` properties';
  }

  return geokdbush.around(index(cities), longitude, latitude, limit, distance);
};
