import axios from 'axios';

export const getReservations = async (setReservations, cookies) => {
  try {
    const response = await axios.get('http://localhost:3000/reservations/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies["access-token"]}`,

      },
      withCredentials: true,
    });
    setReservations(response.data);
  } catch (err) {
    console.log(err);
  }
};

export const addReservation = async (cookies, reservation, listingId) => {
  fetch(`http://localhost:3000/reservations/user/${listingId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cookies["access-token"]}`,

    },
    credentials: "include",
    body: JSON.stringify({
      price: reservation.price,
      startDate: reservation.startDate,
      endDate: reservation.endDate
    })
  })
    .then(response => console.log(response.json()))
    .catch(err => console.log(err))


}


//export const addReservation = async (reservation, setReservations) => {
//  try {
//    const response = await axios.post('http://localhost:3000/reservations', reservation, {
//      headers: {
//        'Content-Type': 'application/json',
//      },
//      withCredentials: true,
//    });
//    setReservations(prevReservations => [...prevReservations, response.data]);
//  } catch (err) {
//    console.log(err);
//  }
//};

export const deleteReservation = async (id, setReservations, cookies) => {
  try {
    await axios.delete(`http://localhost:3000/reservations/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies["access-token"]}`,
      },
      withCredentials: true,
    });
    setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== id));
  } catch (err) {
    console.log(err);
  }
};
