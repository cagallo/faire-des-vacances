import { calculateTotalSpent, filterUserTrips } from '../utils';

const mockTraveler = {
  id: 2,
  name: 'Rachael Vaughten',
  travelerType: 'thrill-seeker',
};

const mockTrips = [
  {
    id: 1,
    userID: 44,
    destinationID: 49,
    travelers: 1,
    date: '2022/09/16',
    duration: 8,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 2,
    userID: 35,
    destinationID: 25,
    travelers: 5,
    date: '2022/10/04',
    duration: 18,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 3,
    userID: 2,
    destinationID: 3,
    travelers: 4,
    date: '2022/05/22',
    duration: 17,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 4,
    userID: 43,
    destinationID: 14,
    travelers: 2,
    date: '2022/02/25',
    duration: 10,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 5,
    userID: 42,
    destinationID: 29,
    travelers: 3,
    date: '2022/04/30',
    duration: 18,
    status: 'approved',
    suggestedActivities: [],
  },
  {
    id: 6,
    userID: 2,
    destinationID: 5,
    travelers: 3,
    date: '2022/06/29',
    duration: 9,
    status: 'approved',
    suggestedActivities: [],
  },
];

const mockDestinations = [
  {
    id: 1,
    destination: 'Lima, Peru',
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 400,
    image:
      'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    alt: 'overview of city buildings with a clear sky',
  },
  {
    id: 2,
    destination: 'Stockholm, Sweden',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 780,
    image:
      'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'city with boats on the water during the day time',
  },
  {
    id: 3,
    destination: 'Sydney, Austrailia',
    estimatedLodgingCostPerDay: 130,
    estimatedFlightCostPerPerson: 950,
    image:
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'opera house and city buildings on the water with boats',
  },
  {
    id: 4,
    destination: 'Cartagena, Colombia',
    estimatedLodgingCostPerDay: 65,
    estimatedFlightCostPerPerson: 350,
    image:
      'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    alt: 'boats at a dock during the day time',
  },
  {
    id: 5,
    destination: 'Madrid, Spain',
    estimatedLodgingCostPerDay: 150,
    estimatedFlightCostPerPerson: 650,
    image:
      'https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'city with clear skys and a road in the day time',
  },
  {
    id: 6,
    destination: 'Jakarta, Indonesia',
    estimatedLodgingCostPerDay: 70,
    estimatedFlightCostPerPerson: 890,
    image:
      'https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    alt: 'lit up city at night',
  },
  {
    id: 7,
    destination: 'Paris, France',
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 395,
    image:
      'https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    alt: 'city during the day time with eiffel tower',
  },
];

describe('filterUserTrips', () => {
  it('should filter all trips by user id and return an array of matching trips', () => {
    const actual = filterUserTrips(mockTrips, mockTraveler.id);

    expect(actual).toHaveLength(2);
    expect(actual).toMatchSnapshot();

    actual.forEach((trip) => {
      expect(trip.userID).toEqual(mockTraveler.id);
    });
  });

  it('should return an empty array if there are no trips for given user id', () => {
    const travelerId = 40;

    const actual = filterUserTrips(mockTrips, travelerId);

    expect(actual).toHaveLength(0);
    expect(actual).toMatchSnapshot();
  });
});

describe('calculateTotalSpent', () => {
  const calculateTotalMinusFee = (trips, destinations) => {
    return trips.reduce((acc, trip) => {
      destinations.forEach((destination) => {
        if (destination.id === trip.destinationID) {
          acc += destination.estimatedLodgingCostPerDay * trip.duration;
          acc += destination.estimatedFlightCostPerPerson * trip.travelers;
          console.log('acc test fuc', acc);
        }
      });
      return acc;
    }, 0);
  };

  const userTrips = filterUserTrips(mockTrips, mockTraveler.id);

  it('should calculate the total amount a single user has spent on travel', () => {
    const baseTotal = calculateTotalMinusFee(userTrips, mockDestinations);
    const expected = baseTotal * 1.1;
    const actual = calculateTotalSpent(userTrips, mockDestinations);

    expect(actual).toEqual(expected);
    expect(actual).toMatchSnapshot();
  });

  it('should add a 10 percent travel agent fee to total amount spent', () => {
    const expected = calculateTotalMinusFee(userTrips, mockDestinations);
    const actual = calculateTotalSpent(userTrips, mockDestinations);
    const difference = actual - expected;

    expect(difference * 11).toEqual(actual);
  });

  it('should return 0 for total spent if the user has no trip history', () => {
    const travelerId = 30;
    const userTrips = filterUserTrips(mockTrips, travelerId);
    const actual = calculateTotalSpent(userTrips, mockDestinations);

    expect(actual).toEqual(0);
  });
});
