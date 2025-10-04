import axios from "axios";


export const getFavListings = async (cookies, setFavListings) => {
    axios.get(`http://localhost:3000/listings/user/favorites`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies["access-token"]}`,
        },
        withCredentials: true,

    }).then(response => response.data)
        .then(data => setFavListings(data))
        .catch(err => console.log(err))
}

export const deleteFav = async (cookies, listingId) => {
    axios.delete(`http://localhost:3000/listings/user/favorites/${listingId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies["access-token"]}`,
        },
        withCredentials: true,
    }).then(response => response.data)
        .then(data => console.log(data))
        .catch(err => console.log(err))
}

export const addFav = async (cookies, listingId) => {

        fetch(`http://localhost:3000/listings/user/favorites/${listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies["access-token"]}`,
            },
            credentials: "include",
        }).then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
}
    