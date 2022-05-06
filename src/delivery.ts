import clc from "cli-color";
import Drone from "./models/Drone";
import Location from './models/Location';
import Trip from "./models/Trip";
import { readFile } from "./utils/files";

export const loadDrones = (data: string): Drone[] =>  {
  const dronesData = data.split(',');
  const drones: Drone[] = [];

  for (let i = 0; i < dronesData.length; i += 2) {
    drones.push({
      name: dronesData[i].trim(),
      maxWeight : parseInt(dronesData[i+1]),
    });
  }

  return drones;
}

export const loadLocations = (data: string[]): Location[] =>  {
  const locations : Location[] = data.slice(1).map(item => {
    const locationData = item.split(',');
    return {
      name: locationData[0].trim(),
      packageWeight: parseInt(locationData[1])
    }
  });

  return locations;
}

export const createTrips = (drones: Drone[], locations: Location[]): Trip[] => {
  const trips : Trip[] = [];
  const locationsUsed: Location[] = [];

  // To reduce the numbers of trips, sort the arrays from the biggest value to the lowest
  const sortedDrones = [...drones].sort((a, b) => {return b.maxWeight - a.maxWeight});
  const sortedLocations = locations.sort((a, b) => {return b.packageWeight - a.packageWeight});

  let numLocationsUsed = 0;
  while (locationsUsed.length < sortedLocations.length) {

    sortedDrones.forEach((drone, index) => {
      let tripLocations : Location[] = [];
      let droneLimit = drone.maxWeight;
      let remWeight = remainingWeight(sortedLocations, locationsUsed);

      while (remWeight > 0) {
        // Select the locations to create the drone trip
        sortedLocations.forEach((location) => {
          if ((droneLimit >= location.packageWeight)  && (locationsUsed.indexOf(location) < 0)) {
              droneLimit -= location.packageWeight;
              tripLocations.push(location);
              locationsUsed.push(location);
          }
        });

        if (tripLocations.length > 0) {
          trips.push({drone, locations: tripLocations});
          droneLimit = drone.maxWeight;
          tripLocations = [];
        }

        if (numLocationsUsed !== locationsUsed.length){
          numLocationsUsed = locationsUsed.length;
        } else {
          // In case of completed the loop and the number of locationsUsed didn't change
          throw new Error('Drone maxWeight is less than required to create the trips.');
        }

        remWeight = remainingWeight(sortedLocations, locationsUsed);
        if ((index + 1 < sortedDrones.length) && (remWeight <= sortedDrones[index + 1].maxWeight)) {
          break; // Pick next drone, current drone is bigger than required, next drone can handle the remaining weight
        }
      };
    });
  }

  return trips;
}

export const remainingWeight = (sortedLocations: Location[], locationsUsed: Location[]): number => {
  return sortedLocations.filter(location => locationsUsed.indexOf(location) < 0)
    .reduce((total, location) => {
      return total + location.packageWeight;
    }, 0);
}

export const showTrips = async (fileName: string) => {
  try {
    const csv = await readFile(fileName);
    const drones: Drone[] = loadDrones(csv[0]);
    const locations: Location[] = loadLocations(csv);
    const trips : Trip[] = createTrips(drones, locations);

    drones.forEach(drone => {
      let tripNumber = 1;
      trips.filter(trip => trip.drone === drone).forEach(trip => {
        if (tripNumber === 1 ){
          console.log(clc.bold(`[${drone.name}]`));
        }

        const strLocations: string = trip.locations.reduce((acumalator, location) => {
          return acumalator === '' ? `[${location.name}]`  : acumalator + `, [${location.name}]`;
        },'');

        if (strLocations !== '') {
          console.log('Trip #' + tripNumber);
          console.log(strLocations);
          console.log('');
          tripNumber++;
        }
      })
    });
  } catch (e) {
    console.log('Could not create the trips, please check if the input file is valid.');
    console.log((<Error> e).message);
  }
}
