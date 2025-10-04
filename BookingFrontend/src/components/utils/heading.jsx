import React from 'react';
  
  function Heading ({ title, subTitle, center }) {
    return (
      <div className={center ? "text-center" : "text-start"}>
        <div className="text-2xl font-bold">{title}</div>
        <div className="mt-2 font-light text-neutral-500">{subTitle}</div>
      </div>
    );
  };
  
  export default Heading;
  