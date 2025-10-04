import Container from "../utils/container";
import Heading from "../utils/heading";
import ListingCard from "../listing/listingCard";
import { useSelector } from "react-redux";

const Favorites = ({

}) => {

    const wishlist = useSelector(state => state.wishlist);


    return (
        <Container>
            <Heading
                title="Favorites"
                subTitle="List of places you have favorited!"
            />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {wishlist.map((fav) => (
                    <ListingCard key={fav.id} data={fav} favorites={wishlist} heart={true} />
                ))}
            </div>
        </Container>
    );
};

export default Favorites;