import { expect, describe, it } from 'vitest';
import Map from 'ol/Map';
import GeolocaliseCenter from '../../src/components/geolicalise-center';
import { Geolocation, View } from 'ol';

describe('GeolocaliseCenter class test suite', () => {
  it('GeolocatiseCenter creation', () => {
    const map = new Map({target: 'test'});
    const view = new View();
    const geolocation = new Geolocation();
    const geolocationCenter = new GeolocaliseCenter(map, view, geolocation)
    expect(geolocationCenter).toBeDefined();
  })
})
