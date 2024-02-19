import React, { useState } from 'react';

const ContentView = ({ uploadedFiles }) => {
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const handleLike = (file) => {
    setLikes({ ...likes, [file.name]: (likes[file.name] || 0) + 1 });
  };

  const handleCommentChange = (event, file) => {
    setComments({ ...comments, [file.name]: event.target.value });
  };

  const handleCommentSubmit = (event, file) => {
    event.preventDefault();
    setComments({ ...comments, [file.name]: '' });
  };

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {uploadedFiles.map((file, index) => (
          <div className="col" key={index}>
            <div className="card h-100">
              <img src={URL.createObjectURL(file)} className="card-img-top" alt="Uploaded" />
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <button className="btn btn-outline-primary" onClick={() => handleLike(file)}>
                    Like <span className="badge bg-primary">{likes[file.name] || 0}</span>
                  </button>
                  <button className="btn btn-outline-secondary">Share</button>
                </div>
                <div className="comment-section">
                  <h5>Comments</h5>
                  <ul className="list-unstyled">
                    <li>{comments[file.name]}</li>
                  </ul>
                  <form onSubmit={(e) => handleCommentSubmit(e, file)}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add a comment..."
                        value={comments[file.name] || ''}
                        onChange={(e) => handleCommentChange(e, file)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentView;

