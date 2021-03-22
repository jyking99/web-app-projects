import React from 'react';

import css from './Comments.module.css';

function Comments(props) {
    const userId = props.userId;
    const desc = props.desc;
    const comments = props.comments;

    const listItems = comments.map((comment) => 
        <li><strong>{comment.userId}</strong> {comment.text}</li>
    );

    return (
        <ul>
            <li><strong>{userId}</strong> {props.desc}</li>
            {listItems}
        </ul>
    );
}

export default Comments;