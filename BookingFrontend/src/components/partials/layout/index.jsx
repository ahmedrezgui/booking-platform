import { React } from "react";
import Header from "../header";
import Footer from "../footer";
import SearchModal from "../../modals/searchModal";
import RentModal from "../../rent_modal/rentModal";
import LoginModal from "../../login";
import RegisterModal from "../../sign_up";


function Layout({ action, children, searchBar }) {


    return (<>

        <Header searchBar={searchBar} />
       
        <SearchModal action={(value) => action(value)} />
        <RentModal />
        <LoginModal />
        <RegisterModal />

        {children}
        <Footer />

    </>)
}

export default Layout;