import 'jest';
import path from 'path';
import clc from "cli-color";
import { createTrips, loadDrones, loadLocations, remainingWeight, showTrips } from '../delivery';
import Drone from '../models/Drone';
import Location from '../models/Location';
import Trip from '../models/Trip';
import { readFile } from '../utils/files';

describe('delivery', () => {
    const FILENAME = path.resolve(__dirname, 'test_data.csv');

    const DRONES_EXPECTED : Drone[] = [
      { name: 'Drone A', maxWeight: 35 },
      { name: 'Drone B', maxWeight: 60}
    ];

    const LOCATIONS_EXPECTED : Location[] = [
      { name: 'Location A', packageWeight: 15},
      { name: 'Location B', packageWeight: 18},
      { name: 'Location C', packageWeight: 15},
      { name: 'Location D', packageWeight: 8},
      { name: 'Location E', packageWeight: 25},
      { name: 'Location F', packageWeight: 40},
      { name: 'Location G', packageWeight: 30},
      { name: 'Location H', packageWeight: 15},
      { name: 'Location I', packageWeight: 46},
      { name: 'Location J', packageWeight: 20},
      { name: 'Location K', packageWeight: 10},
      { name: 'Location L', packageWeight: 15},
    ];

    const TRIPS_EXPECTED: Trip[] = [
      {drone: DRONES_EXPECTED[1], locations: [LOCATIONS_EXPECTED[8], LOCATIONS_EXPECTED[10]]},
      {drone: DRONES_EXPECTED[1], locations: [LOCATIONS_EXPECTED[5], LOCATIONS_EXPECTED[9]]},
      {drone: DRONES_EXPECTED[1], locations: [LOCATIONS_EXPECTED[6], LOCATIONS_EXPECTED[4]]},
      {drone: DRONES_EXPECTED[1], locations: [LOCATIONS_EXPECTED[1], LOCATIONS_EXPECTED[0], LOCATIONS_EXPECTED[2], LOCATIONS_EXPECTED[3]]},
      {drone: DRONES_EXPECTED[0], locations: [LOCATIONS_EXPECTED[7], LOCATIONS_EXPECTED[11]]},
    ]

    it('should be able to load drones', async () => {
      const csv = await readFile(FILENAME);
      const drones = loadDrones(csv[0]);
      expect(drones).not.toBeNull();
      expect(drones).toHaveLength(2);
      expect(drones).toMatchObject(DRONES_EXPECTED);
    });

    it('should be able to load locations', async () => {
      const csv = await readFile(FILENAME);
      const locations = loadLocations(csv);
      expect(locations).not.toBeNull();
      expect(locations).toHaveLength(12);
      expect(locations).toMatchObject(LOCATIONS_EXPECTED);
    });

    it('should be able to calculate remaining weight', async () => {
      const csv = await readFile(FILENAME);
      const locations = loadLocations(csv);
      const locationsUsed = [...locations].splice(0,5);
      const remWeight = remainingWeight(locations, locationsUsed);
      expect(remWeight).not.toBeNull();
      expect(remWeight).toEqual(176);
    });

    it('should be able to create trips', async () => {
      const csv = await readFile(FILENAME);
      const drones = loadDrones(csv[0]);
      const locations = loadLocations(csv);
      const trips = createTrips(drones, locations);
      expect(trips).not.toBeNull();
      expect(trips).toHaveLength(5);
      expect(trips).toMatchObject(TRIPS_EXPECTED);
    });

    it('should be able to show trips', async () => {
      jest.spyOn(global.console, 'log').mockImplementation();

      await showTrips(FILENAME);
      expect(console.log).toBeCalledWith(clc.bold('[Drone A]'));
      expect(console.log).toBeCalledWith('Trip #1');
      expect(console.log).toBeCalledWith('[Location H], [Location L]');
      expect(console.log).toBeCalledTimes(17);
    });

    it('should show error message if file not exits', async () => {
      jest.spyOn(global.console, 'log').mockImplementation();
      const file = path.resolve(__dirname, 'test.csv');

      await showTrips(file);
      expect(console.log).toBeCalledWith('Could not create the trips, please check if the input file is valid.');
      expect(console.log).toBeCalledTimes(2);
    });

    it('should show error message if drone maxWeight is less than required', async () => {
      jest.spyOn(global.console, 'log').mockImplementation();
      const file = path.resolve(__dirname, 'test_data_drone_max_weight.csv');

      await showTrips(file);
      expect(console.log).toBeCalledWith('Drone maxWeight is less than required to create the trips.');
      expect(console.log).toBeCalledTimes(2);
    });
});
