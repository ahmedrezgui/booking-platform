import { React, useState, useEffect } from "react";
import Container from "../utils/container";
import { getListings } from "../../services/listing";
import ListingCard from "../listing/listingCard";
import { useSelector } from "react-redux";




function Home({ filters }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings(filters, setListings);
  }, [filters])

  const wishlist = useSelector(state => state.wishlist);


  return (

    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-16">
        {listings.map((item) => (
          <div key={item.id}>
            <ListingCard data={item} favorites={wishlist} heart={true} />
          </div>
        ))}
      </div>
    </Container>

  );
};

export default Home;