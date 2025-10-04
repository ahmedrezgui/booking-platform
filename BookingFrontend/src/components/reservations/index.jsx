import React, { useCallback,useState, useEffect } from 'react';
import { getReservations , deleteReservation} from '../../services/reservation';
import Layout from '../partials/layout';
import { useCookies } from 'react-cookie';
import Heading from '../utils/heading';
import ListingCard from '../listing/listingCard';
import Container from '../utils/container';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ReservationPage() {
  const [cookies] = useCookies(['access-token']);
  const [reservations, setReservations] = useState([]);
  // const [newReservation, setNewReservation] = useState({ name: '', date: '', time: '' });

  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");
  const onCancel = useCallback(
    (id) => {
        setDeletingId(id);
        try {
            deleteReservation(id, setReservations,cookies);
            navigate(0);
            toast.success("Reservation deleted");
        } catch (err) {
            toast.error(err.message);
        } finally {

            setDeletingId("");
        }
    },
    [navigate],
    );

  useEffect(() => {
    getReservations(setReservations,cookies);
  }, []);

 

  if (reservations.length === 0) {
    return (
      <Layout searchBar={false}>
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
          <Heading title="No reservations" subTitle="You have no reservations yet" center />
        </div>
      </Layout>
    );

  }
  
  return (
    <Layout searchBar={false}>
      <Container>
            <Heading
                title="Properties"
                subTitle="Where you've been and where you're going"
            />
            <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((item) => (
                    <ListingCard
                        key={item.id}
                        data={item.listing}
                        actionId={item.id}
                        onAction={onCancel}
                        disabled={deletingId === item.id}
                        actionLabel="Cancel Reservation"

                    />
                ))}
            </div>
        </Container>
    </Layout>
  );
}

export default ReservationPage;
