import React, { useState } from 'react';
import { FacebookShareButton, EmailShareButton, WhatsappShareButton } from 'react-share';

const SocialMediaApp = () => {
    const [posts, setPosts] = useState([]);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

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
        setSelectedPostId(postId);
        setShowShareDialog(true);
    };

    const generateShareUrl = (post) => {
        // Generate a unique share URL based on the post ID
        return `https://example.com/share/${post.id}`;
    };

    const handleCloseShareDialog = () => {
        setShowShareDialog(false);
        setSelectedPostId(null);
    };

    const openShareDialog = () => {
        // Open a custom dialog for sharing options
        return (
            <div className="share-dialog">
                <button onClick={() => handleShareTo('newsfeed')}>Share on Facebook</button>
                <button onClick={() => handleShareTo('whatsapp')}>Share on WhatsApp</button>
                <button onClick={() => handleShareTo('email')}>Share via Email</button>
                <button onClick={handleCloseShareDialog}>Cancel</button>
            </div>
        );
    };

    const handleShareTo = (platform) => {
        const shareUrl = generateShareUrl(posts.find(post => post.id === selectedPostId));
        switch (platform) {
            case 'newsfeed':
                // Share to news feed
                console.log('Sharing to news feed');
                break;
            case 'whatsapp':
                // Share to WhatsApp
                console.log('Sharing to WhatsApp');
                break;
            case 'email':
                // Share via email
                console.log('Sharing via email');
                break;
            default:
                break;
        }
        handleCloseShareDialog();
    };

    return (
        <div>
            <UploadForm onPostSubmit={handlePostSubmit} />
            {posts.map(post => (
                <div key={post.id} className="post">
                    {post.text && <p>{post.text}</p>}
                    {post.fileType === 'photo' && <img src={URL.createObjectURL(post.file)} alt="Uploaded" />}
                    {post.fileType === 'video' && <video src={URL.createObjectURL(post.file)} controls></video>}
                    <button onClick={() => handleLike(post.id)}>Like ({post.likes})</button>
                    <button onClick={() => handleShare(post.id)}>Share ({post.shares})</button>
                    <div>
                        {post.comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))}
                        <CommentForm postId={post.id} onCommentSubmit={handleComment} />
                    </div>
                </div>
            ))}
            {showShareDialog && openShareDialog()}
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
        <div>
            <hr />
            <h2>Create a Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="postText">Post Text:</label>
                    <textarea
                        className="form-control"
                        placeholder="Share your thoughts..."
                        style={{ height: '100px', width: '100%', maxWidth: '500px' }}
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

