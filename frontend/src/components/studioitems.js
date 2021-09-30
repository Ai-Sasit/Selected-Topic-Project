import { deleteStream } from '../actions';
import { useDispatch } from 'react-redux';
import {storage} from '../firebase/config';
import React from 'react';

function Studioitems(props) {
  
  const s = props.stream;
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the stream with title: ${s.title}`)) {
      storage.ref(s.img_path).delete();
      dispatch(deleteStream(s.key));
      props.pop.history.push('/studio');
    } else {
      props.pop.history.push('/studio');
    }
  }

  const handleEdit = () => {
    props.pop.history.push(`/studio/edit/${s.key}`);
  }

    return (
        <div className={`s-item`}>{/* eslint-disable-next-line*/}
          <img src={s.img_url} className="s-img"/>
          <div className="s-title">{s.title}<br/><span>Description: {s.desc}<br/>Create at {s.date_time}</span></div>
          <div className="s-keys"><span>Stream Key:</span> {s.key}</div>
          <div className="s-button">
            <button className="bt-edit" onClick={handleEdit}>EDIT</button><br/>
            <button className="bt-delete" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
    ); 
}

export default Studioitems;