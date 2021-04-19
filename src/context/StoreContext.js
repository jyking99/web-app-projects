import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import uniqueId from "utils/uniqueId";

import firebase from 'firebase';
// import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBOTXQW664QADfbQ4O53esoXVFRDJBkHlU",
  authDomain: "web-app-jy-6deb1.firebaseapp.com",
  databaseURL: "web-app-jy-6deb1.firebaseapp.com",
  projectId: "web-app-jy-6deb1",
  storageBucket: "web-app-jy-6deb1.appspot.com",
  messagingSenderId: "30527812486",
  appId: "1:30527812486:web:1a40141e67b73abbd6f207"
};

// export the context so that other components can import
export const StoreContext = createContext();

function StoreContextProvider(props) {
  let history = useHistory();

  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const db = firebase.firestore();
  const auth = firebase.auth();

  const [currentUserId, setCurrentUserId] = useState(null); // or 'judy'
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {// initialization
    db.collection('users').get().then(snapshot => {
      const users = snapshot.docs.map(d => d.data());
      setUsers(users);
    });
    db.collection('posts').get().then(snapshot => {
      const posts = snapshot.docs.map(d => d.data());
      setPosts(posts);
    });
    db.collection('likes').get().then(snapshot => {
      const likes = snapshot.docs.map(d => d.data());
      setLikes(likes);
    });
    db.collection('followers').get().then(snapshot => {
      const followers = snapshot.docs.map(d => d.data());
      setFollowers(followers);
    });
    db.collection('comments').get().then(snapshot => {
      const comments = snapshot.docs.map(d => d.data());
      setComments(comments);
    });
  }, []); // second argument to [] to be called only once

  function signup(email, password, bio, id, name, photo) {
    const user = {
      email, id, name, bio, photo
    };
    auth.createUserWithEmailAndPassword(email, password).then(() => {
      // add a user to the firestore database
      db.collection('users').add(user);
      // add a user to the app state
      setUsers(users.concat(user));
      // set the user as a current user 
      setCurrentUserId(id);
      // route to home
      history.push('/');
    })
  }

  function login(email, password) {
    auth.signInWithEmailAndPassword(email, password).then((response) => {
      // success
      db.collection('users')
        .where('email', '==', response.user.email)
        .get()
        .then(snapshot => {
          setCurrentUserId(snapshot.docs[0].data().id); //first document's data = user info
          history.push('/');
        })
    }).catch(error => {
      setCurrentUserId(null);
    });
  }

  function addLike(postId) {
    const like = {
      userId: currentUserId,
      postId,
      datetime: new Date().toISOString()
    };
    console.log(like);
    setLikes(likes.concat(like));
    db.collection('likes').add(like);
  }

  function removeLike(postId) {
    setLikes(likes.filter(like => !(like.userId === currentUserId && like.postId === postId)));
    db.collection('likes')
      .where('userId', '==', currentUserId)
      .where('postId', '==', postId)
      .get()
      .then(snapshot => snapshot.forEach(doc => doc.ref.delete()));
  }

  function addComment(postId, text) {
    const comment = {
      userId: currentUserId,
      postId,
      text,
      datetime: new Date().toISOString()
    };
    setComments(comments.concat(comment));
    db.collection('comments').add(comment);
  }

  function addPost(photo, desc) {
    const post = {
      id: uniqueId('post'),
      userId: currentUserId,
      photo,
      desc,
      datetime: new Date().toISOString()
    }
    setPosts(posts.concat(post));
    db.collection('posts').add(post);
  }

  function addFollower(userId, followerId) {
    const rel = {
      userId: userId,
      followerId: followerId
    }
    setFollowers(followers.concat(rel));
    db.collection('followers').add(rel);
  }

  function removeFollower(userId, followerId) {
    setFollowers(followers.filter(rel => !(rel.userId === userId && rel.followerId === followerId)));
    db.collection('followers')
      .where('userId', '==', userId)
      .where('followerId', '==', followerId)
      .get()
      .then(snapshot => snapshot.forEach(doc => doc.ref.delete()));
  }

  return (
    <StoreContext.Provider value={{ signup, login, currentUserId, setCurrentUserId, users, setUsers, posts, setPosts, likes, setLikes, followers, setFollowers, comments, setComments, addComment, addLike, removeLike, addPost, addFollower, removeFollower }}>
      {props.children}
    </StoreContext.Provider>
  )
}
export default StoreContextProvider; // export this component as default



