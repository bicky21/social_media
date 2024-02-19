import React, { useState } from 'react';

const SocialMediaApp = () => {
    const [posts, setPosts] = useState([]);

    const handlePostSubmit = (postText, file, fileType) => {
        const newPost = {
            id: Date.now(),
            text: postText,
            file: file,
            fileType: fileType,
            likes: 0,
            comments: [],
            shares: 0
        };
        setPosts([...posts, newPost]);
    };

    const handleLike = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
    };

    const handleComment = (postId, commentText) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, commentText] } : post
        ));
    };

    const handleShare = (postId) => {
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, shares: post.shares + 1 } : post
        ));
    };

    return (
        <div className="container mt-5">
            <UploadForm onPostSubmit={handlePostSubmit} />
            {posts.map(post => (
                <div key={post.id} className="card my-3">
                    <div className="card-body">
                        {post.text && <p>{post.text}</p>}
                        {post.fileType === 'photo' && <img src={URL.createObjectURL(post.file)} className="img-fluid" alt="Uploaded" />}
                        {post.fileType === 'video' && <video src={URL.createObjectURL(post.file)} className="img-fluid" controls></video>}
                        <button className="btn btn-primary me-2" onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
                        <button className="btn btn-primary me-2" onClick={() => handleShare(post.id)}>Share ({post.shares})</button>
                        <div>
                            {post.comments.map((comment, index) => (
                                <p key={index}>{comment}</p>
                            ))}
                            <CommentForm postId={post.id} onCommentSubmit={handleComment} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const UploadForm = ({ onPostSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const postText = event.target.elements.postText.value;
        const file = event.target.elements.fileUpload.files[0];
        const fileType = file ? (file.type.startsWith('image') ? 'photo' : 'video') : '';
        onPostSubmit(postText, file, fileType);
        event.target.reset();
    };

    return (
        <div className="card">
            <div className="card-body">
                <h2>Create a Post</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="postText">Post Text:</label>
                        <textarea
                            className="form-control"
                            placeholder="Share your thoughts..."
                            style={{ height: '100px', maxWidth: '500px' }}
                            id="postText"
                            name="postText"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fileUpload">Select File:</label>
                        <input type="file" className="form-control-file" id="fileUpload" name="fileUpload" accept="image/*, video/*" />
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>
        </div>
    );
};

const CommentForm = ({ postId, onCommentSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const commentText = event.target.elements.commentText.value;
        onCommentSubmit(postId, commentText);
        event.target.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="commentText">Add Comment:</label>
                <textarea className="form-control" id="commentText" name="commentText"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Comment</button>
        </form>
    );
};

export default SocialMediaApp;
