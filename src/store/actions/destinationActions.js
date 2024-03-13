const setDestinations = (destinationObj) => {
  return {
    type: 'SET_DESTINATIONS',
    payload: destinationObj,
  };
};

export default setDestinations;
