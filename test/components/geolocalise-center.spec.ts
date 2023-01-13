import { expect, describe, it } from 'vitest';
import Map from 'ol/Map';
import GeolocationCenter from '../../src/components/geolocation-center';
import { Geolocation, View } from 'ol';

describe('GeolocationCenter class test suite', () => {
  it('GeolocationCenter creation', () => {
    const map = new Map({target: 'test'});
    const view = new View();
    const geolocation = new Geolocation();
    const geolocationCenter = new GeolocationCenter(map, view, geolocation)
    expect(geolocationCenter).toBeDefined();
  })
})
