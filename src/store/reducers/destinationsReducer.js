const allDestinations = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DESTINATIONS':
      return {
        ...state,
        destinations: action.payload,
      };
    default:
      return state;
  }
};

export default allDestinations;
