import React from 'react';

const ShareButton = ({ onClick }) => {
  return (
    <button className="btn btn-outline-secondary" onClick={onClick}>
      Share
    </button>
  );
};

export default ShareButton;
