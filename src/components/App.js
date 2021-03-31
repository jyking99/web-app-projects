import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Header';
import Navbar from './Navbar';

import Home from './Home';
import Explore from './Explore';
import Activity from './Activity';
import NewPost from './NewPost';
import Profile from './Profile';

import initialStore from 'utils/initialStore';

import css from "./App.module.css";
import uniqueId from "utils/uniqueId";

function App(props) {
  const [page, setPage] = useState('home');
  const [store, setStore] = useState(initialStore);

  function addLike(postId) {
    const like = {
      userId: store.currentUserId,
      postId,
      datetime: new Date().toISOString()
    };

    setStore({
      ...store,
      likes: store.likes.concat(like)
    });
  }

  function removeLike(postId) {
    setStore({
      ...store,
      likes: store.likes.filter(like => !(like.userId === store.currentUserId && like.postId === postId))
    });
  }

  function addComment(postId, text) {
    const comment = {
      userId: store.currentUserId,
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setStore({
      ...store,
      comments: store.comments.concat(comment)
    });
  }

  function addPost(photo, desc) {
    // TODO:
    // 1. Create a new post object (use uniqueId('post') to create an id)
    const post = {
      id: uniqueId('post'),
      userId: store.currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    }
    // 2. Update the store 
    setStore({
      ...store,
      posts: store.posts.concat(post)
    });
  }

  function addFollower(userId, followerId){
    // use concat
    const rel = {
      userId: userId,
      followerId: followerId
    }

    setStore({
      ...store,
      followers: store.followers.concat(rel)
    });
  }
  function removeFollower(userId, followerId){
    // use filter
    setStore({
      ...store,
      followers: store.followers.filter(rel => !(rel.userId === userId && rel.followerId === followerId))
    });
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className={css.container}>
        <Header />
        <main className={css.content}>
          <Switch>
            <Route path="/explore">
              <Explore />
            </Route>
            <Route path="/newpost">
              <NewPost store={store} addPost={addPost} />
            </Route>
            <Route path="/activity">
              <Activity />
            </Route>
	          <Route path="/profile/:userId?">
              <Profile store={store} onFollow={addFollower} onUnfollow={removeFollower} />
            </Route>
            <Route path="/:postId?">
              <Home store={store}
                onLike={addLike}
                onUnlike={removeLike}
                onComment={addComment} />
            </Route>
          </Switch>
        </main>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;