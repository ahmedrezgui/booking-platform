import React, { useState, useEffect } from "react";
import FooterModal from "./modal";
import CollapsedFooter from "./footer";

const Footer = () => {


    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; 
        };
    }, [isExpanded]);
    const toggleFooter = () => {
        setIsExpanded(!isExpanded);
    };
    const collapseFooter = () => {
        setIsExpanded(false);
    }

    return (<>

        {
            isExpanded ?
                <FooterModal isExpanded={isExpanded} collapseFooter={collapseFooter} /> :
                <CollapsedFooter toggleFooter={toggleFooter} />

        }

    </>

    );
};

export default Footer;
