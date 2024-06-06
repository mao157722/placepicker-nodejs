export async function fetchAvailebelPlaces(){
    // console.log('fetchPlaces');
    const response = await fetch('http://localhost:3000/places')
    const resData = await response.json();

    if (!response.ok) // 400, 500 error
    {
      throw new Error('Failed to fetching availebal places');
    }

    return resData.places;
}

export async function updateUserPlaces(places) {
   const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const resData = await response.json();

  if(!response.ok) {
    throw new Error('Failed update data');
  }

  return resData.message;
}

export async function fetchUserPlaces(){
  // console.log('fetchPlaces');
  const response = await fetch('http://localhost:3000/user-places')
  const resData = await response.json();

  if (!response.ok) // 400, 500 error
  {
    throw new Error('Failed to fetching user places');
  }

  return resData.places;
}