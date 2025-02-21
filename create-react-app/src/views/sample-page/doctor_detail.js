import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../service/user_service/get_user.js';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      const data = await getUserById(id);
      setDoctor(data);
    };
    fetchDoctor();
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div>
      <h2>Doctor Detail</h2>
      <p>
        <strong>Username:</strong> {doctor.username}
      </p>
      <p>
        <strong>Full Name:</strong> {doctor.fullName}
      </p>
      <p>
        <strong>Email:</strong> {doctor.email}
      </p>
      <p>
        <strong>Phone:</strong> {doctor.phone}
      </p>
      <p>
        <strong>Address:</strong> {doctor.address}
      </p>
    </div>
  );
};

export default DoctorDetail;
