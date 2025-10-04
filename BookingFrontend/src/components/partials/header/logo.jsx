import React from "react";
import { Link } from "react-router-dom";


const Logo = ({ h, w }) => {

    return (
        <Link to="/home">
            <img
                alt="logo"
                className="hidden cursor-pointer md:block"
                height={h}
                width={w}
                src="/assets/images/logo.svg"
            />

        </Link>

    );
};

export default Logo;