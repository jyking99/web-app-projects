import React from "react";

import Comments from './Comments.js';

import css from './Post.module.css';

import publicUrl from '../utils/publicUrl.js';
import timespan from '../utils/timespan.js';

function Post(props) {
    return (
        <div className={css.post}>
            <div className={css.head}>
                <img src={publicUrl(props.user.photo)} />
                <p><strong>{props.user.id}</strong></p>
            </div>
            <div className={css.content}>
                <div className={css.imageFrame}>
                    <img src={props.post.photo} />
                </div>
                <div className={css.interactions}>
                    <div className={css.buttons}>
                        <button>
                            <img src={props.likes.self ? publicUrl('/assets/unlike.svg') : publicUrl('/assets/like.svg')} alt="Like" />
                        </button>
                        <button>
                            <img src={publicUrl('/assets/comment.svg')} alt="Comment" />
                        </button>
                    </div>
                    <div className={css.likes}>
                        <p><strong>{props.likes.count} likes</strong></p>
                    </div>
                    <div className={css.comments}>
                        <Comments comments={props.comments}/>
                    </div>
                    <p className={css.ago}>{timespan(props.post.datetime)} ago</p>
                </div>
            </div>
        </div>
    );
}

export default Post;