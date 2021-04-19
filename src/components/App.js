import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Header from './Header';
import Navbar from './Navbar';

import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Explore from './Explore';
import Activity from './Activity';
import NewPost from './NewPost';
import Profile from './Profile';

import StoreContextProvider from "context/StoreContext.js";

import css from "./App.module.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <StoreContextProvider>
        <div className={css.container}>
          <Header />
          <main className={css.content}>
            <Switch>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/explore">
                <Explore />
              </Route>
              <Route path="/newpost">
                <NewPost />
              </Route>
              <Route path="/activity">
                <Activity />
              </Route>
              <Route path="/profile/:userId?">
                <Profile />
              </Route>
              <Route path="/:postId?">
                <Home />
              </Route>
            </Switch>
          </main>
          <Navbar />
        </div>
      </StoreContextProvider>
    </Router>
  );
}

export default App;