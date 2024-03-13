import './TripCard.css';

export const TripCard = ({
  destination,
  date,
  travelers,
  duration,
  image,
  alt,
}) => {
  console.log(image);
  return (
    <section className='trip-card'>
      <img src={image} alt={alt} className='destination-photo' />
      <h4>{destination}</h4>
      <div className='trip-details'>
        <h5 className='trip-date'>{date}</h5>
        <h5 className='trip-travelers-number'># of travelers: {travelers}</h5>
        <p className='trip-duration'>{duration} days</p>
      </div>
    </section>
  );
};
