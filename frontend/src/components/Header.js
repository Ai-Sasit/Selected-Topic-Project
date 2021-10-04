import React from 'react';
import {Link} from 'react-router-dom';

function Header(props) {

  const refreshing = () => {
    window.location.replace("/");
  }

  return (<div>
    <header className="bar_header" id="Header">
      <div className="area_header">
        <div className="text_header" onClick={refreshing}>
          <Link to="#" className="link-head">Image Saving - Easy way to save your Image</Link>
        </div>
        <Link to="/upload-img" className="bt-up"><button className="bt-signin">Upoload Image</button></Link>
      </div>
    </header>
      <div className="sub-header"></div>
      </div>
  );
}

export default Header;