import React from "react";
import Properties from "../components/properties";
import Layout from "../components/partials/layout";


function PropertiesPage() {



    return (
        <>
            <Layout searchBar={false}>
                <Properties />
            </Layout>
        </>
    )
}

export default PropertiesPage;