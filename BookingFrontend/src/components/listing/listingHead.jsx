import React from 'react';
import useCountries from '../../hooks/useCountries';
import Heading from '../utils/heading.jsx';
import HeartButton from '../utils/heartButton.jsx'; // Adaptez le chemin selon la structure de votre projet

const ListingHead = ({ id, imageSrc, title, locationValue, currentUser }) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-4xl relative">
        <img
          alt="image"
          src={imageSrc}
          className="object-cover w-full h-full"
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute top-5 right-5">
          {/*<HeartButton listingId={id} currentUser={currentUser} />*/}
        </div>
      </div>
    </>
  );
};

export default ListingHead;
