import React from 'react';
import { logic } from 'kea/GeoLocation/logic';
import { useValues } from 'kea';

export const NearByCities = () => {
  const { cities } = useValues(logic);

  return (
    <div>
      {cities.map((city, i) => (
        <pre key={i}>{JSON.stringify(city, null, 2)}</pre>
      ))}
    </div>
  );
};

export const GeoLocBrowser = () => {
  const { cords } = useValues(logic);

  return (
    <div>
      <h3>User Geo Location Fetched from Browser</h3>
      <div>Longitude: {cords.longitude}</div>
      <div>Latitude: {cords.latitude} </div>
    </div>
  );
};

export const GeoLocIP = () => {
  const { data } = useValues(logic);

  return (
    <div>
      <h3>User Geo Location Data Over IP</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
