import { expect, describe, it } from 'vitest';
import Map from 'ol/Map';
import Drawer from '../../src/components/drawer';

describe('Drawer class test suite', () => {
  it('Ensure that the interaction is enabled', () => {
    const map = new Map({target: 'test'});
    const drawer = new Drawer(map, document.documentElement, true);
    drawer.typeSelect = new HTMLInputElement();
    drawer.typeSelect.value = 'Point';
    drawer.addInteraction();
    expect(drawer.draw).toBeDefined()
    expect(drawer.snap).toBeDefined()
  })

  it('Interaction is not available when parameter is wrong', () => {
    const map = new Map({target: 'test'});
    const drawer = new Drawer(map, document.documentElement, true);
    drawer.addInteraction();
    expect(drawer.draw).toBeUndefined()
    expect(drawer.snap).toBeUndefined()
  })
})
