import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../service/user_service/get_user.js';

const ParentDetail = () => {
  const { id } = useParams();
  const [parent, setParent] = useState(null);

  useEffect(() => {
    const fetchParent = async () => {
      const data = await getUserById(id);
      setParent(data);
    };
    fetchParent();
  }, [id]);

  if (!parent) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Detail</h2>
      <p>
        <strong>Username:</strong> {parent.username}
      </p>
      <p>
        <strong>Full Name:</strong> {parent.fullName}
      </p>
      <p>
        <strong>Email:</strong> {parent.email}
      </p>
      <p>
        <strong>Phone:</strong> {parent.phone}
      </p>
      <p>
        <strong>Address:</strong> {parent.address}
      </p>
    </div>
  );
};

export default ParentDetail;
