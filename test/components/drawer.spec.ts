import { expect, describe, it } from 'vitest';
import Map from 'ol/Map';
import Drawer from '../../src/components/drawer';

describe('Drawer class test suite', () => {
  it('Ensure that the interaction is enabled', () => {
    const map = new Map({target: 'test'});
    const drawer = new Drawer(map, 'Point', true);
    drawer.addInteraction();
    expect(drawer.draw).toBeDefined()
    expect(drawer.snap).toBeDefined()
  })

})
