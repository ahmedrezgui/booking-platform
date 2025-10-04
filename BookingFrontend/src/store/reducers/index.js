import { combineReducers } from "redux";
import wishlist from "./wishlist_reducer";

const rootReducer = combineReducers({
    wishlist,
})
export default rootReducer;