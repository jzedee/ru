import React, { useState } from 'react';

import "../styles/post.css"

const PostContainer = ({ post }) => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleComment = () => {
        setComments(comments + 1);
    };

    const handleAddLink = () => {
        // Add logic to handle adding a link
    };

    return (
        <div className="post-container">
            <div className="post-header">
                <div className="post-details">
                    <img src={post.profile} alt={post.name} className="profile-image" />
                    <div>
                        <div className="post-author">{post.name}</div>
                        <div className="post-category">{post.dept} | {post.category}</div>
                    </div>
                </div>
                <button>
                    {/* <MoreVertIcon /> */}
                    &#8942;
                </button>
            </div>
            <div className="post-body">{post.postBody}</div>
            <div className="post-actions">
                <div className="like-section">
                    <button onClick={handleLike}>
                        ❤️
                    </button>
                    <div>{likes} Likes</div>
                </div>
                <div className="comment-section">
                    <button onClick={handleComment}>
                        💬
                    </button>
                    <div>{comments} Comments</div>
                </div>
                <button onClick={handleAddLink}>Add Link</button>
            </div>
        </div>
    );
};

export default PostContainer;
