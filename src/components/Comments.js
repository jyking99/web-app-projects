import React from 'react';

import css from './Comments.module.css';

function Comments(props) {
    // console.log(props);

    const comments = props.comments;
    console.log(comments);

    const listItems = comments.map((comment) => 
        <li><strong>{comment.userId}</strong> {comment.text}</li>
    );

    return (
        <ul>{listItems}</ul>
    );
}

export default Comments;