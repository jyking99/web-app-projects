import React from "react";

import Header from './Header';
import Navbar from './Navbar';

import Home from './Home';
import Explore from './Explore';
import Activity from './Activity';
import NewPost from './NewPost';
import Profile from './Profile';

import css from "./App.module.css";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "home"
    }

    this.setPage = this.setPage.bind(this);
  }

  setPage(page) {
    this.setState({ page: page });
  }

  renderMain(page) {
    switch (page) {
      case "home": return <Home />;
      case "explore": return <Explore />;
      case "newpost": return <NewPost />;
      case "activity": return <Activity />;
      case "profile": return <Profile />;
      default: return <Home />;
    }
  }

  render() {
    return (
      <div className={css.container}>
        <Header />
        <main className={css.content}>
          {this.renderMain(this.state.page)}
        </main>
        <Navbar onNavChange={this.setPage}/>
      </div>
    );
  }
}

export default App;