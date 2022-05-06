import 'jest';
import path from 'path';
import { readFile } from '../utils/files';

describe('delivery', () => {
    const FILENAME = path.resolve(__dirname, 'test_data.csv');

    const CSV_EXPECTED = [
      'Drone A, 35, Drone B, 60',
      'Location A, 15',
      'Location B, 18',
      'Location C, 15',
      'Location D, 8',
      'Location E, 25',
      'Location F, 40',
      'Location G, 30',
      'Location H, 15',
      'Location I, 46',
      'Location J, 20',
      'Location K, 10',
      'Location L, 15',
    ];

    it('should be able to import data from csv file', async () => {
      const csv = await readFile(FILENAME);
      expect(csv).not.toBeNull();
      expect(csv).toHaveLength(13);
      expect(csv).toMatchObject(CSV_EXPECTED);
    });

    it('should return exception if file does not exists', async () => {
      const file = path.resolve(__dirname, 'test.csv');

      try {
        await readFile(file);
      } catch(e) {
        expect(e).not.toBeNull();
      }
    });

});
