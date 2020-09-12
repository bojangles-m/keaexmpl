import geokdbush from 'geokdbush';
import kdbush from 'kdbush';
import axios from './axios';

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

/**
 * Retrive my Geo Location from Browser
 * @returns {Object} - {latitude, longitude}
 */
export const geoFindMe = () => {
  var options = {
    timeout: 20000,
    maximumAge: 1000 * 60 * 10,
  };

  function success(position, resolve) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    resolve({ latitude, longitude });
  }

  function error(err, reject) {
    let msg = 'Unable to retrieve your location';

    switch (err.code) {
      case err.PERMISSION_DENIED:
        msg = 'User denied the request for Geolocation.';
        break;
      case err.POSITION_UNAVAILABLE:
        msg = 'Location information is unavailable.';
        break;
      case err.TIMEOUT:
        msg = 'The request to get user location timed out.';
        break;
      case err.UNKNOWN_ERROR:
        msg = 'An unknown error occurred.';
        break;
    }

    reject(msg);
  }

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser');
    } else {
      // Responsible to get Geo location position
      navigator.geolocation.getCurrentPosition(
        pos => success(pos, resolve),
        err => error(err, reject),
        options,
      );
    }
  });
};

export const geoLoc = async (success, error) => {
  let response;
  try {
    response = await axios.get();
  } catch (error) {
    error(err);
    return;
  }

  const json = await response.data;

  if (response.status === 200) {
    success(json);
  } else {
    error(json.message);
  }
};
