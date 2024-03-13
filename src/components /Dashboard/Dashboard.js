import { useEffect, useState } from 'react';
import {
  fetchDestinations,
  fetchTravelerTrips,
  fetchTravelers,
} from '../../utils';
import { TripContainer } from '../TripContainer/TripContainer';
import './Dashboard.css';
import { useDispatch } from 'react-redux';
import setDestinations from '../../store/actions/destinationActions';

export const Dashboard = () => {
  const [traveler, setTraveler] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [travelerId, setTravelerId] = useState();
  const [allTrips, setAllTrips] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTravelerData = async () => {
      await fetchTravelerData();
    };
    getTravelerData().catch((error) => console.log(error));
  }, []);

  const fetchTravelerData = async () => {
    const response = await Promise.all([
      fetchTravelers(),
      fetchTravelerTrips(),
      fetchDestinations(),
    ]);

    console.log('RESPONSE', response);
    const randomTraveler =
      response[0].travelers[
        Math.floor(Math.random() * (response[0].travelers.length - 1))
      ];
    console.log('randomTraveler', randomTraveler);
    if (!traveler) {
      setTraveler(randomTraveler);
    }
    setTravelerId(randomTraveler.id);
    setAllTrips(response[1].trips);
    console.log('response[2].destinations', response[2].destinations);
    dispatch(setDestinations(response[2].destinations));
    setDestinations(response[2].destinations);
  };

  return (
    <section className='dashboard-container'>
      <h1 className='my-trips-title'>My Trips</h1>
      <TripContainer
        allTrips={allTrips}
        travelerId={travelerId}
        destinations={destinations}
      />
    </section>
  );
};
