import React from "react";
import Layout from "../components/partials/layout/index";
import Profile from "../components/profile";
import styles from './profile.module.css'

//test

function ProfilePage() {
    return (
        <>
        <Layout >
        <div className={styles.profile}>
                <Profile />
            
        </div>
        </Layout>

        </>

    )
}

export default ProfilePage;
