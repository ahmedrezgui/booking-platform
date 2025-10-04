import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../../hooks/useFavorite";


function HeartButton({
    listing,
    userFav
}) {

    const { findListing, toggleFavorite } = useFavorite({
        listing,
        userFav
    });

    return (
        <div
            onClick={toggleFavorite}
            className="relative transition cursor-pointer hover:opacity-80">
            <AiOutlineHeart
                size={28}
                className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
                size={25}
                className={
                    findListing ?
                        "fill-rose-500" :
                        "fill-neutral-500/70"}
            />
        </div>
    )
}

export default HeartButton;