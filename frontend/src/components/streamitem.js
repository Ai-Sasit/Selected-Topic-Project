import { Link } from "react-router-dom";
import React from 'react';

function streamitem(props) {
  
  const s = props.stream;
    return (
        <Link className={`card`} to={`/play-stream/${s.key}`}>{/* eslint-disable-next-line*/}
          <img src={s.img_url} className="card-img"/>
          <div className="card-title">{s.title}</div>
        </Link>
    ); 
}

export default streamitem;