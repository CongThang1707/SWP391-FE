import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeedbackById } from '../../service/feedback_service/get_feedback.js';

const FeedBackDetail = () => {
  const { id } = useParams();
  const [feedback, setFeedBack] = useState(null);

  useEffect(() => {
    const fetchFeedBack = async () => {
      const data = await getFeedbackById(id);
      setFeedBack(data);
    };
    fetchFeedBack();
  }, [id]);

  if (!feedback) return <p>Loading...</p>;

  return (
    <div>
      <h2>FeedBack Detail</h2>
      <p>
        <strong>feedbackId:</strong> {feedback.feedbackId}
      </p>
      <p>
        <strong>consultingId:</strong> {feedback.consultingId}
      </p>
      <p>
        <strong>rate:</strong> {feedback.rate}
      </p>
      <p>
        <strong>comment:</strong> {feedback.comment}
      </p>
      <p>
        <strong>parentId:</strong> {feedback.parentId}
      </p>
      <p>
        <strong>doctorId:</strong> {feedback.doctorId}
      </p>
    </div>
  );
};

export default FeedBackDetail;
