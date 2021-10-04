import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Index from "./components/pages/index";
import UploadImage from "./components/pages/uploadImage";
import ShowImage from "./components/pages/showImage";
import EditImage from "./components/pages/editImage";

function App() {
  return (
    <BrowserRouter>
      <div id="container">
        <Header />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/upload-img" component={UploadImage} />
            <Route path="/show-img/:id" component={ShowImage} />
            <Route path="/edit-img/:id" component={EditImage} />
          </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
