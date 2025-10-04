import styles from './profile.module.css'
import { useEffect, useState } from 'react'
import { getUser, updateUser } from '../../services/user';
import { useCookies } from "react-cookie";



function Profile() {

    // States
    const [user, setUser] = useState([])
    const [cookies, setCookies] = useCookies(['access-token']);


    // const [editName, setEditName] = useState(false)
    // const [editBirth, setEditBirth] = useState(false)
    // const [editPhone, setEditPhone] = useState(false)
    // const [editEmail, setEditEmail] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(user, cookies, setUser);
    }

    useEffect(() => {
        getUser(cookies, setUser);
    }, []);

    return (
        <>
            <div className={styles.Profile}>
                <div className={styles.ProfileInfo}>
                    <img className={styles.ProfileImage} src={user.avatar_url} alt="profile" />
                    <div className={styles.ProfileData}>
                        <div className={styles.ProfilePerson}>
                            <h3>Personal Informations:</h3>
                            {
                                <p>Name :
                                    {user.name}
                                </p>
                            }
                            {<p>Email :
                                {user.email}
                            </p>
                            }
                            {<p>Phone Number :
                                {user.phoneNumber}
                            </p>
                            }
                            {<p>Birthday :
                                {user.dob}
                            </p>
                            }
                        </div>
                    </div>
                </div >

                <div className={styles.ProfileMore}>
                    <h2>Edit Profile:</h2>
                    <div className={styles['edit-profile-container']}>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={user.name || ''}
                                onChange={(e) => setUser({ ...user, name: e.target.value })}
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email || ''}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />

                            <label htmlFor="phoneNumber">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={user.phoneNumber || ''}
                                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
                            />

                            <label htmlFor="dob">Birthday:</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={user.dob || ''}
                                onChange={(e) => setUser({ ...user, dob: e.target.value })}
                            />

                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
