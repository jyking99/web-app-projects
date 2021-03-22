import React, { useState } from "react";

import Comments from './Comments.js';

import css from './Post.module.css';

import publicUrl from 'utils/publicUrl.js';
import timespan from 'utils/timespan.js';

function Post(props) {
    const [comment, setComment] = useState('');
    const [toggleComment, setToggleComment] = useState(false); // hidden initially

    function handleLike() {
        props.onLike(props.post.id);
    }

    function handleUnlike() {
        props.onUnlike(props.post.id);
    }

    function handleSubmitComment(event) {
        console.log(props.post.id, comment);
        props.onComment(props.post.id, comment); // this calls addComment from App.js
        setComment(''); //reset
        setToggleComment(false); //close comment box
        event.preventDefault(); // prevent page refresh
    }

    return (
        <div className={css.post}>
            <div className={css.head}>
                <img src={publicUrl(props.user.photo)} alt="icon" />
                <p><strong>{props.user.id}</strong></p>
            </div>
            <div className={css.content}>
                <div className={css.imageFrame}>
                    <img src={publicUrl(props.post.photo)} alt="pic" />
                </div>
                <div className={css.interactions}>
                    <div className={css.buttons}>
                        <button>
                            {props.likes.self ?
                                <img src={publicUrl('/assets/unlike.svg')} onClick={handleUnlike} alt="Like" /> :
                                <img src={publicUrl('/assets/like.svg')} onClick={handleLike} alt="unLike" />
                            }
                        </button>
                        <button onClick={e => setToggleComment(!toggleComment)}>
                            <img src={publicUrl('/assets/comment.svg')} alt="Comment" />
                        </button>
                    </div>
                    <div className={css.likes}>
                        <p><strong>{props.likes.count} likes</strong></p>
                    </div>
                    <div className={css.comments}>
                        <Comments userId={props.post.userId} desc={props.post.desc} comments={props.comments} />
                    </div>
                    <p className={css.ago}>{timespan(props.post.datetime)} ago</p>
                    {toggleComment &&
                        <form className={css.addComment} onSubmit={handleSubmitComment}>
                            <input type="text" placeholder="Add a comment…" value={comment} onChange={e => setComment(e.target.value)} />
                            <button type="submit">Post</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    );
}

export default Post;