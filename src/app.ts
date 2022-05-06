import path from 'path';
import { showTrips } from './delivery';

const FILENAME = path.resolve(__dirname, 'data', 'data.csv');

showTrips(FILENAME);
