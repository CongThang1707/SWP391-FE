import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChildrenById } from '../../service/children-services/get_children.js';

const ChildrenDetail = () => {
  const { id } = useParams();
  const [children, setChildren] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      const data = await getChildrenById(id);
      setChildren(data);
    };
    fetchChildren();
  }, [id]);

  if (!children) return <p>Loading...</p>;

  return (
    <div>
      <h2>Children Detail</h2>
      <p>
        <strong>Children Name:</strong> {children.childrenName}
      </p>
      <p>
        <strong>Age:</strong> {children.age}
      </p>
      <p>
        <strong>Gender:</strong> {children.gender}
      </p>
      <p>
        <strong>Parent Name:</strong> {children.parentName}
      </p>
    </div>
  );
};

export default ChildrenDetail;
