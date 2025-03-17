//consulting_detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConsultingById } from '../../service/consulting_service/get_consulting.js';

const ConsultingDetail = () => {
  const { id } = useParams();
  const [consulting, setConsulting] = useState(null);

  useEffect(() => {
    const fetchConsulting = async () => {
      const data = await getConsultingById(id);
      setConsulting(data);
    };
    fetchConsulting();
  }, [id]);

  if (!consulting) return <p>Loading...</p>;

  return (
    <div>
      <h2>Consulting Detail</h2>
      <p>
        <strong>consultingId:</strong> {consulting.consultingId}
      </p>
      <p>
        <strong>title:</strong> {consulting.title  }
      </p>
      <p>
        <strong>comment:</strong> {consulting.comment}
      </p>
      <p>
        <strong>bookingId:</strong> {consulting.bookingId}
      </p>
      <p>
        <strong>doctorId:</strong> {consulting.doctorId}
      </p>
      <p>
        <strong>parentId:</strong> {consulting.parentId}
      </p>
      <p>
        <strong>childId:</strong> {consulting.childId}
      </p>
      <p>
        <strong>date:</strong> {consulting.date}
      </p>
    </div>
  );
};

export default ConsultingDetail;
