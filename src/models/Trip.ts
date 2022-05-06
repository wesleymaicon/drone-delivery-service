import Drone from "./Drone";
import Location from "./Location";

type Trip = {
  drone: Drone,
  locations: Location[],
}

export default Trip;
