import { kea } from 'kea';
import { geoFindMe, geoLoc, nearByCities } from './helpers';
const allCities = require(`cities/cities5000.json`);

export const logic = kea({
  actions: {
    fetchGeoLocBrowser: true,
    setGeo: cords => ({ cords }),
    setFetchError: error => ({ error }),

    fetchGeoLocIP: true,
    setGeoLocData: data => ({ data }),

    setCities: cities => ({ cities }),
  },
  reducers: {
    cities: [
      [],
      {
        setCities: (_, { cities }) => cities,
      },
    ],
    cords: [
      { latitude: null, longitude: null },
      {
        setGeo: (_, { cords }) => cords,
      },
    ],
    data: [
      {},
      {
        setGeoLocData: (_, { data }) => data,
      },
    ],
    error: [
      null,
      {
        setGeo: () => null,
        setFetchError: (_, { error }) => error,
      },
    ],
  },
  listeners: ({ actions }) => ({
    fetchGeoLocBrowser: async _ => {
      try {
        const cords = await geoFindMe();
        actions.setGeo(cords);
      } catch (error) {
        actions.setFetchError(error);
      }
    },
    fetchGeoLocIP: _ => {
      geoLoc(
        json => actions.setGeoLocData(json),
        err => actions.setFetchError(err),
      );
    },
    setGeoLocData: ({ data }) => {
      const query = { latitude: data.latitude, longitude: data.longitude };
      const distance = 20; // km
      const limit = 5;
      const nbc = nearByCities(allCities, query, limit, distance);
      actions.setCities(nbc);
    },
  }),

  events: ({ actions }) => ({
    afterMount: () => {
      actions.fetchGeoLocBrowser();
      actions.fetchGeoLocIP();
    },
  }),
});
