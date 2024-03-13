import { createContext, useContext } from 'react';

export const DestinationsContext = createContext();

export function useDestinationContext() {
  const destinations = useContext(DestinationsContext);

  // if (!destinations) {
  //   throw new Error('You must use DestinationContext in Dashboard component');
  // }

  return destinations;
}
