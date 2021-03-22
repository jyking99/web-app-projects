import React from 'react';

import Header from './Header.js';
import PostThumbnail from './PostThumbnail.js';

import publicUrl from 'utils/publicUrl.js';

import css from './Profile.module.css';

function Profile(props) {
  const { store } = props;
  const user = store.users.find(user => user.id === store.currentUserId);

  function getPosts() {
    return store.posts.filter(post => post.userId === store.currentUserId);
  }

  function countPosts() {
    let posts = getPosts();
    return posts.length;
  }

  function countFollowers() {
    let followers = store.followers.filter(follower => follower.userId === store.currentUserId);
    return followers.length;
  }

  function countFollowing() {
    let followers = store.followers.filter(follower => follower.followerId === store.currentUserId);
    return followers.length;
  }

  function getThumbs() {
    return getPosts().map(post =>
      <PostThumbnail props={post} />
    );
  }

  return (
    <div>
      <Header />
      <div className={css.upper}>
        <div className={css.prof}>
          <div className={css.head}>
            <img src={publicUrl(user.photo)} alt="bigFace" />
            <h2>{user.id}</h2>
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