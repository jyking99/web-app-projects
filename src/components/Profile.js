import React from 'react';
import { Link, useParams } from "react-router-dom";

import Header from './Header.js';
import PostThumbnail from './PostThumbnail.js';

import publicUrl from 'utils/publicUrl.js';

import css from './Profile.module.css';

function Profile(props) {
  const { store } = props;
  let { userId } = useParams();
  const user = store.users.find((userId === undefined) ? user => user.id === store.currentUserId : user => user.id === userId);

  function getPosts() {
    return store.posts.filter(post => post.userId === user.id);
  }

  function countPosts() {
    let posts = getPosts();
    return posts.length;
  }

  function countFollowers() {
    let followers = store.followers.filter(follower => follower.userId === user.id);
    return followers.length;
  }

  function countFollowing() {
    let followers = store.followers.filter(follower => follower.followerId === user.id);
    return followers.length;
  }

  function getThumbs() {
    return getPosts().map(post =>
      <Link key={post.id} to={`/${post.id}`}>
        <PostThumbnail props={post} />
      </Link>
    );
  }

  function handleFollow() {
    props.onFollow(user.id, store.currentUserId);
  }

  function handleUnfollow() {
    props.onUnfollow(user.id, store.currentUserId);
  }

  function renderFollowButton() {
    if (user.id===store.currentUserId) {
      // self
      return;
    }

    let following = store.followers.some(follow => follow.userId === user.id && follow.followerId === store.currentUserId)
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