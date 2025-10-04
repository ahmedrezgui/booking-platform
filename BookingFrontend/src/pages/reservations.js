import React from "react";
import Reservations from "../components/reservations";
import Layout from "../components/partials/layout";


function ReservationsPage() {



    return (
        <>
            <Layout searchBar={false}>
                <Reservations />
            </Layout>
        </>
    )
}

export default ReservationsPage;