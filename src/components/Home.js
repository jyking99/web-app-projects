import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Post from "./Post.js";

import { StoreContext } from "context/StoreContext.js";

function Home() {
    let {postId} = useParams(); // the variable name has to match the parameter name

    let {
        posts, users, comments, likes, currentUserId, 
        addComment, addLike, removeLike
    } = useContext(StoreContext);

    function findUser(post) {
        return users.find(user => user.id === post.userId);
    }

    function findComments(post) {
        return comments.filter(comment => comment.postId === post.id);
    }

    function findLikes(post) {
        let postLikes = likes.filter(like => like.postId === post.id);
        return {
            self: postLikes.some(like => like.userId === currentUserId),
            count: postLikes.length
        }
    }

    return (
        <div>
            {posts.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                .filter((postId===undefined) ? post => post : post => post.id === postId)
                .map(post =>
                    <Post
                        key={post.id}
                        user={findUser(post)}
                        post={post}
                        comments={findComments(post)}
                        likes={findLikes(post)}
                        onLike={addLike} 
                        onUnlike={removeLike}
                        onComment={addComment} 
                    />)}
        </div>
    );
}

export default Home;