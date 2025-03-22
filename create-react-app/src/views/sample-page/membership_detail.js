//membership_detail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMembershipByType } from '../../service/membership_services/get_membership.js';

const MembershipDetail = () => {
  const { id } = useParams();
  const [memberships, setMemberships] = useState(null);

  console.log(id);
  useEffect(() => {
    const fetchMembership = async () => {
      const data = await getMembershipByType(id);
      console.log(data);
      setMemberships(data);
    };
    fetchMembership();
  }, [id]);

  if (!memberships) return <p>Loading...</p>;

  return (
    <div>
      <h2>Membership Detail</h2>
      <p>
        <strong>membershipId:</strong> {memberships.membershipId}
      </p>
      <p>
        <strong>type:</strong> {memberships.type}
      </p>
      <p>
        <strong>price:</strong> {memberships.price}
      </p>
      <p>
        <strong>Description:</strong> {memberships.description}
      </p>
    </div>
  );
};

export default MembershipDetail;
