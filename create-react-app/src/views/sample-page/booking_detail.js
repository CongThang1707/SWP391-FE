import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBooking } from '../../service/booking_services/get_booking.js';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await getBooking(id);
      setBooking(data);
    };
    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading...</p>;

  const statusStyle = {
    color: booking.status === 'PENDING' ? 'red' : booking.status === 'CONFIRMED' ? 'green' : 'black'
  };

  return (
    <div>
      <h2>Booking Detail</h2>
      <p>
        <strong>Doctor Name:</strong> {booking.doctorName}
      </p>
      <p>
        <strong>Parent Name:</strong> {booking.parentName}
      </p>
      <p>
        <strong>Schedule Work:</strong> {booking.scheduleWork}
      </p>
      <p>
        <strong>Booking Date:</strong> {booking.bookDate}
      </p>
      <p>
        <strong>Comment:</strong> {booking.comment}
      </p>
      <p>
        <strong>Status:</strong> <span style={statusStyle}>{booking.status}</span>
      </p>
    </div>
  );
};

export default BookingDetail;
