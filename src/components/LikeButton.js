import React from 'react';

const LikeButton = ({ onClick, count }) => {
  return (
    <button className="btn btn-outline-primary me-2" onClick={onClick}>
      Like <span className="badge bg-primary">{count}</span>
    </button>
  );
};

export default LikeButton;
