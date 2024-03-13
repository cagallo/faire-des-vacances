import { useEffect, useState } from 'react';
import { TripCard } from '../TripCard /TripCard';
import { filterUserTrips, calculateTotalSpent } from '../../utils';
import './TripContainer.css';
import dayjs from 'dayjs';

export const TripContainer = ({ allTrips, travelerId, destinations }) => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [pastTrips, setPastTrips] = useState([]);
  const [pendingTrips, setPendingTrips] = useState([]);
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    sortByTripStatus(allTrips);
  }, [allTrips]);

  const sortByTripStatus = (allTrips) => {
    if (allTrips && allTrips.length) {
      const userTrips = filterUserTrips(allTrips, travelerId);
      setUserTrips(userTrips);
      userTrips.forEach((trip) => {
        if (trip.status === 'pending') {
          setPendingTrips((pendingTrips) => [...pendingTrips, trip]);
        }

        if (trip.status === 'approved' && !dayjs(trip.date).isAfter(dayjs())) {
          console.log('if past trips');
          setPastTrips((pastTrips) => [...pastTrips, trip]);
        }

        console.log('if COMING trips');
        if (trip.status === 'approved' && dayjs(trip.date).isAfter(dayjs())) {
          setUpcomingTrips((upcomingTrips) => [...upcomingTrips, trip]);
        }
      });
    }
    console.log('upcomingTrips', upcomingTrips);
    console.log('past', pastTrips);
    console.log('PENDING', pendingTrips);
  };

  const mapTripCards = (tripStatus) => {
    return tripStatus.map((trip) => {
      const singleDestination = destinations.find(
        (destination) => destination.id === trip.destinationID
      );
      return (
        <TripCard
          key={trip.id}
          destination={singleDestination.destination}
          date={new Date(trip.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
          travelers={trip.travelers}
          duration={trip.duration}
          image={singleDestination.image}
          alt={singleDestination.alt}
        />
      );
    });
  };

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='my-trips-container'>
      <section className='trips-list'>
        <div className='trip-status-container'>
          <h2 className='trip-status-title'>Pending Trips</h2>
          <div className='trip-grid'>
            {pendingTrips.length ? (
              mapTripCards(pendingTrips)
            ) : (
              <h4 className='no-trips-message'>No Pending Trips</h4>
            )}
          </div>
        </div>
        <div className='trip-status-container'>
          <h2 className='trip-status-title'>Upcoming Trips</h2>
          <div className='trip-grid'>
            {upcomingTrips.length ? (
              mapTripCards(upcomingTrips)
            ) : (
              <h4 className='no-trips-message'>No Upcoming Trips</h4>
            )}
          </div>
        </div>
        <div className='trip-status-container'>
          <h2 className='trip-status-title'>Past Trips</h2>
          <div className='trip-grid'>
            {pastTrips.length ? (
              mapTripCards(pastTrips)
            ) : (
              <h4 className='no-trips-message'>No Past Trips</h4>
            )}
          </div>
        </div>
      </section>
      <aside className='total-spent-container'>
        <h3 className='total-spent-text'>
          Total Spent:{' '}
          {USDollar.format(calculateTotalSpent(userTrips, destinations))}
        </h3>
      </aside>
    </div>
  );
};
