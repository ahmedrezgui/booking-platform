import axios from "axios";

import React, { useCallback, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Container from "../utils/container";
import Heading from "../utils/heading";
import ListingCard from "../listing/listingCard";
import { deleteListing, getUserListings } from "../../services/listing";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


const Properties = ({
}) => {

    const [listings, setListings] = useState([]);
    const [cookies, setCookies] = useCookies(['access-token']);


    useEffect(() => {
        getUserListings(setListings, cookies);
    }, [])


    const navigate = useNavigate();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback(
        (id) => {
            setDeletingId(id);
            try {
                deleteListing(id, cookies);
                navigate(0);
                toast.success("Listing deleted");
            } catch (err) {
                toast.error(err.message);
            } finally {

                setDeletingId("");
            }
        },
        [navigate],
    );

    return (
        <Container>
            <Heading
                title="Properties"
                subTitle="Where you've been and where you're going"
            />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {listings.map((item) => (
                    <ListingCard
                        key={item.id}
                        data={item}
                        actionId={item.id}
                        onAction={onCancel}
                        disabled={deletingId === item.id}
                        actionLabel="Delete Property"
                        heart={false}


                    />
                ))}
            </div>
        </Container>
    );
};

export default Properties;