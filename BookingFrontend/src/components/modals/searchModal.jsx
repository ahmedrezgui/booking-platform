import { React, lazy, memo, Suspense } from "react";
import Modal from "./modal";
import { formatISO } from "date-fns";
import { redirect, useSearchParams } from "react-router-dom";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import useSearchModal from "../../hooks/useSearchModal";
import Heading from "../utils/heading";
import CalendarComp from "../common/calendar";
import Counter from "../common/counter";
import CountrySelect from "../common/countrySelect";
import { getListings } from "../../services/listing";




const STEPS = {
  LOCATION: 0,
  DATE: 1,
  INFO: 2,
}

const loadMap = lazy(() => import("../common/map"));
const Map = memo(loadMap);



const SearchModal = ({ action }) => {


  const searchModal = useSearchModal();


  const [location, setLocation] = useState();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });



  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    };

    const filters = {
      country: location?.value,
      startDate: formatISO(dateRange.startDate),
      endDate: formatISO(dateRange.endDate),
      capacity: guestCount,
      bathrooms: bathroomCount,
      rooms: roomCount,
    };
    action(filters);


    setStep(STEPS.LOCATION);
    searchModal.onClose();

  }, [
    bathroomCount,
    dateRange,
    guestCount,
    location,
    onNext,
    searchModal,
    roomCount,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subTitle="Find the perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Suspense fallback={<div>Loading...</div>} >
        <Map height={`h-[35vh]`} center={location?.latlng} />
      </Suspense>
    </div>
  );


  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subTitle="Make sure everyone is free"
        />
        <CalendarComp
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subTitle="Find your perfect place" />
        <Counter
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
          title="Guests"
          subtitle="How many guests are coming?"
        />
        <Counter
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
          title="Rooms"
          subtitle="How many rooms do you need?"
        />
        <Counter
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
        />
      </div>
    );
  }





  return (

    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
