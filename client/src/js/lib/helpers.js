import axios from 'axios';

export const makeUri = ({ PROTOCOL, HOST, PORT }) =>
  `${PROTOCOL}://${HOST}:${PORT}`;

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
  const url = __ENV__.GEOLOC_URL;

  let response;
  try {
    response = await axios.get(url);
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
