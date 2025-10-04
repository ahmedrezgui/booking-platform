import React from "react";


function Avatar({ src, width, height }) {
    return (<>
        <img
            className="rounded-full"
            width={width}
            height={height}
            src={src || `https://res.cloudinary.com/smtanimur/image/upload/v1658841812/mushfiqTanim/user_qcrqny_kcgfes.svg`}
            alt="avatar"
        />

    </>)
}

export default Avatar;