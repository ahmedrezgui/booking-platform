import Layout from "../components/partials/layout";
import Favorites from "../components/favorites";
import { useCookies } from "react-cookie";
import { getFavListings } from "../services/favourites";
import { useEffect, useState } from "react";
import Heading from "../components/utils/heading";

function FavoritesPage() {


    const [cookies, setCookies] = useCookies(['access-token']);
    const [favlistings, setFavListings] = useState([]);
    useEffect(() => {
        getFavListings(cookies, setFavListings);
    }, [cookies])

    if (favlistings.length === 0) {
        return (
            <Layout searchBar={false}>
                <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
                    <Heading title={"No favorites"} subTitle={"You have no favorites yet"} center />
                </div>
            </Layout>
        );
    }

    return (
        <>
            <Layout searchBar={false}>
                <Favorites />
            </Layout>
        </>
    )
}

export default FavoritesPage;