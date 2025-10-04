import axios from "axios";

export const getUser = async (cookies, setUser) => {

    axios.get(`http://localhost:3000/users/${localStorage.getItem('userId')}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies["access-token"],
        },
        withCredentials: true,
    }).then(response => response.data)
        .then(data => { setUser(data) })
        .catch(err => console.log(err))

}


export const updateUser = async (userData, cookies, setUser) => {
    axios.patch(`http://localhost:3000/users/${localStorage.getItem('userId')}`, userData, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + cookies["access-token"],
        },
        withCredentials: true,
    }).then(response => response.data)
        .then(updatedUser => {
            setUser(updatedUser);
            console.log('User data updated successfully!');
        })
        .catch(err => console.log(err));
}
