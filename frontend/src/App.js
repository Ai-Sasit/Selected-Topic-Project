import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Header from "./components/Header";
import Footer from "./components/Footer";
import addform from "./components/pages/addStream";
import index from "./components/pages/listStream";
import studio from "./components/pages/studioStream";
import editform from "./components/pages/editStream";
import search from "./components/pages/searchStream";
import player from "./components/pages/playStream";

function App() {
  return (
    <Router history={history}>
      <div id="container">
        <Header />
          <Switch>
            <Route path="/" exact component={index}/>
            <Route path="/search-stream" component={search}/>
            <Route path="/create-stream" component={addform}/>
            <Route path="/studio" exact component={studio}/>
            <Route path="/studio/edit/:key" component={editform}/>
            <Route path="/play-stream/:key" component={player}/>
          </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
