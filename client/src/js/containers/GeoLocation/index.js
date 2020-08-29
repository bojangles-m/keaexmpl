import React, { Component } from 'react';
import { GeoLocBrowser, GeoLocIP, NearByCities } from 'components/GeoLocation';

export default class GeoLocation extends Component {
  render() {
    return (
      <div className="geo">
        <h1>Find user and Closest cities</h1>
        <GeoLocBrowser />
        <GeoLocIP />
        <h3>Nearest Cities</h3>
        <NearByCities />
      </div>
    );
  }
}
