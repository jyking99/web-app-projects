import React, { useContext } from 'react';
import { Link, useParams } from "react-router-dom";

import Header from './Header.js';
import PostThumbnail from './PostThumbnail.js';

import publicUrl from 'utils/publicUrl.js';

import css from './Profile.module.css';

import {StoreContext} from "context/StoreContext.js";

function Profile() {
  let {
    users, posts, followers, currentUserId,
    addFollower, removeFollower
  } = useContext(StoreContext);

  let { userId } = useParams();

  const user = users.find((userId === undefined) ? user => user.id === currentUserId : user => user.id === userId);

  function getPosts() {
    return posts.filter(post => post.userId === user.id);
  }

  function countPosts() {
    let posts1 = getPosts();
    return posts1.length;
  }

  function countFollowers() {
    let flrs = followers.filter(follower => follower.userId === user.id);
    return flrs.length;
  }

  function countFollowing() {
    let flrs = followers.filter(follower => follower.followerId === user.id);
    return flrs.length;
  }

  function getThumbs() {
    return getPosts().map(p =>
      <Link key={p.id} to={`/${p.id}`}>
        <PostThumbnail props={p} />
      </Link>
    );
  }

  function handleFollow() {
    addFollower(user.id, currentUserId);
  }

  function handleUnfollow() {
    removeFollower(user.id, currentUserId);
  }

  function renderFollowButton() {
    if (user.id===currentUserId) {
      // self
      return;
    }

    let following = followers.some(follow => follow.userId === user.id && follow.followerId === currentUserId)
    let cName = following ? css.unfollowBtn : css.followBtn;
    let btnTxt = following ? "Unfollow" : "Follow";
    let listener = following ? handleUnfollow : handleFollow;

    return (
      <button className={cName} onClick={listener}>{btnTxt}</button>
    );
  }

  return (
    <div>
      <Header />
      <div className={css.upper}>
        <div className={css.prof}>
          <div className={css.head}>
            <img src={publicUrl(user.photo)} alt="bigFace" />
            <div>
              <h2>{user.id}</h2>
              {renderFollowButton()}
            </div>
          </div>
          <div className={css.intro}>
            <p><strong>{user.name}</strong></p>
            <p>{user.bio}</p>
          </div>
        </div>
        <div className={css.attributes}>
          <div>
            <p><strong>{countPosts()}</strong></p>
            <p className={css.weak}>posts</p>
          </div>
          <div>
            <p><strong>{countFollowers()}</strong></p>
            <p className={css.weak}>followers</p>
          </div>
          <div>
            <p><strong>{countFollowing()}</strong></p>
            <p className={css.weak}>following</p>
          </div>
        </div>
      </div>
      <div className={css.lower}>
        <div className={css.posts}>
          {getThumbs()}
        </div>
      </div>
    </div>
  );
}

export default Profile;