
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useLoginModal from "./useLoginModal";
import { addFav, deleteFav } from "../services/favourites";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/actions";


const useFavorite = ({ listing, userFav }) => {
    const [cookies] = useCookies(['access-token']);
    const loginModal = useLoginModal();

    const wishListJson = useSelector(state => state.wishlist);
    const wishList = Object.values(wishListJson);

    const dispatch = useDispatch();

    const findListing = wishList.find((product) =>
        product.id === listing.id);

    const toggleFavorite = useCallback(
        async (e) => {
            e.stopPropagation();

            try {
                if (findListing) {
                    dispatch(removeFromFavorites(listing.id));
                    await deleteFav(cookies, listing.id);
                    toast.success("Removed from favorites!", {
                        duration: 2000, iconTheme: {
                            primary: '#BC7FCD',
                        },
                    });
                } else {
                    dispatch(addToFavorites(listing));
                    await addFav(cookies, listing.id);
                    toast.success("Saved to favorites!", {
                        duration: 2000, iconTheme: {
                            primary: '#BC7FCD',
                        },
                    });
                }
            } catch (error) {
                toast.error("Something went wrong.");
            }
        },
        [userFav, listing, loginModal],
    );

    return {
        findListing,
        toggleFavorite,
    };
};

export default useFavorite;