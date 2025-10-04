export const addToFavorites = (listing) => ({
    type: "ADD_TO_FAVORITES",
    payload: listing
});

export const removeFromFavorites = (listingId) => ({
    type: "REMOVE_FROM_FAVORITES",
    listingId
})
