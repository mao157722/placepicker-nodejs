import { useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { useEffect } from 'react';
import { sortPlacesByDistance } from '../loc.js'
import { fetchAvailebelPlaces } from '../http.js'


const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailabelPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailebelPlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places, 
            position.coords.latitude, 
            position.coords.longitude);
          setAvailabelPlaces(sortedPlaces);
          setIsFetching(false);
        });
      }
      catch (error) {
        setError({
          message: error.message || 'Cloud not fetch places, pleasy try again later'
        });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Connecting server to get data places..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
