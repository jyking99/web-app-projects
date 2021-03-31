import React from 'react';
import { Link } from "react-router-dom";

import css from './Comments.module.css';

function Comments(props) {
    const userId = props.userId;
    const desc = props.desc;
    const comments = props.comments;

    const listItems = comments.map((comment) =>
        <li>
            <Link key={comment.userId} to={`/profile/${comment.userId}`}>
                <strong>{comment.userId}</strong>
            </Link>
            <p>{comment.text}</p>
        </li>
    );

    return (
        <ul>
            <li>
                <Link key={userId} to={`/profile/${userId}`}>
                    <strong>{userId}</strong>
                </Link>
                <p>{desc}</p>
            </li>
            {listItems}
        </ul>
    );
}

export default Comments;