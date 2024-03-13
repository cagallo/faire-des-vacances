import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import './NewTripForm.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllDestinations } from '../../store/features/destinationSlice';

export const NewTripForm = () => {
  const [selectedDestination, setSelectedDestination] = useState();
  const destinations = useSelector((state) => state.destinations);
console.log('destinations', destinations)
  const handleChange = (event) => {
    setSelectedDestination(event.target.value);
  };

  return (
    <div className='form-card'>
      <form>
        <h2>Let's Book a Trip!</h2>
        <FormControl>
          <FormLabel>Date</FormLabel>
          <TextField type='date'></TextField>
          <FormControl>
            <div>
              <FormLabel>Destinations</FormLabel>
              {/* <InputLabel className='destination-label' shrink={true}>
                Destinations
              </InputLabel> */}
            </div>
            <Select
              className='destination-select'
              value=''
              label='Destination'
              onChange={handleChange}
              notched
            >
              {destinations &&
                destinations.map((destination, index) => (
                  <MenuItem key={index} value={destination.name}>
                    {destination.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button>Submit</Button>
        </FormControl>
      </form>
    </div>
  );
};
