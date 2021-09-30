import React from 'react';
import {Link} from 'react-router-dom';
import GoogleAuth from "./GoogleAuth";
import { useSelector} from 'react-redux';

function Header(props) {

  const profile = useSelector(state => state.auth.profile)
  var name = null;
  var img_url = null;
  try{ 
    name = `[ ` + profile["userName"] + ` ]`; 
    img_url = profile["userImg"];
  } catch(e) {}

  const refreshing = () => {
    window.location.replace("/");
  }

  return (
    <header className="bar_header" id="Header">
      <div className="area_header">
        <div className="text_header" onClick={refreshing}><Link to="#" className="link-head">Like Streaming | Easy Platform for Streamer</Link></div>
        {/* eslint-disable-next-line */}
        <img className="profileimg" src={img_url}/>
        <div className="user_name">{name}</div>
      <GoogleAuth/>
      </div>
      <div className="sub-header"></div>
    </header>
  );
}

export default Header;