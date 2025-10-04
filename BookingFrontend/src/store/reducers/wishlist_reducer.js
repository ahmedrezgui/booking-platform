export default function wishlistReducer(wishlist = [], action) {

    switch (action.type) {
        case "ADD_TO_FAVORITES": {
            const listingToAdd = action.payload;
            return [
                ...wishlist,
                listingToAdd
            ];
        }
        case "REMOVE_FROM_FAVORITES": {

            const listingIdToRemove = action.listingId;
            const updatedWishList = wishlist.filter(
                (listing) => listing.id !== listingIdToRemove
            );
            return updatedWishList
                ;
        }

        default:
            return [...wishlist]


    }
}