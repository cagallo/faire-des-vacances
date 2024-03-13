export const fetchTravelerTrips = () => {
  return fetch(`http://localhost:3010/api/v1/trips`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
  /**
   * logic will change with real auth and login
   * for now, id will be randomly chosen based on traveler arr.
   * then we will use that id to filter through trips
   * promise.all - grab travelers and trips
   * math.random on travelers array
   * grab id and fetch all trips
   */
};

export const fetchTravelers = async () => {
  console.log('in fetch travelers');
  const response = await fetch('http://localhost:3010/api/v1/travelers');
  if (response.ok) {
    //console.log(response)
    console.log('ok');
    return await response.json();
  }
  throw response;
};

export const fetchDestinations = async () => {
  const response = await fetch('http://localhost:3010/api/v1/destinations');
  if (response.ok) {
    console.log('destination response ok', response);
    return await response.json();
  }
  throw response;
};

export const filterUserTrips = (allTrips, id) => {
  console.log('typeof', typeof allTrips);
  // return allTrips.filter((trip) => trip.userId === id)
  return allTrips.reduce((acc, trip) => {
    if (trip.userID === id) {
      acc.push(trip);
    }
    return acc;
  }, []);
};

export const calculateTotalSpent = (userTrips, destinations) => {
  return userTrips.reduce((acc, trip) => {
    destinations.forEach((destination) => {
      if (destination.id === trip.destinationID) {
        console.log('here');
        acc += destination.estimatedLodgingCostPerDay * trip.duration * 1.1;
        acc += destination.estimatedFlightCostPerPerson * trip.travelers * 1.1;
        console.log('acc in fn', acc);
      }
    });
    return acc;
  }, 0);
};
