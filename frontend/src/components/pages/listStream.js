import React , {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchStreams } from '../../actions';
import StreamItem from '../streamitem';

function ListStream(props){
    const streams = useSelector(state => Object.values(state.stream))
    const isSignedIn = useSelector(state => state.auth.isSignedIn)
    const dispatch = useDispatch();
    // eslint-disable-next-line
    useEffect(() => {dispatch(fetchStreams()); return () => {};}, []);
    const handleRefresh = () => {window.location.reload();}
    
    return (<div>{isSignedIn? 
            <div className="console-bar">
                <Link className="link" to="#"><i className="fi-rr-rotate-right" onClick={handleRefresh}></i></Link>
                <Link className="link" to="/create-stream"><i className="fi-rr-add"></i></Link>
                <Link className="link" to="/studio"><i className="fi-rr-pulse"></i></Link>
                <Link className="link" to="/search-stream"><i className="fi-rr-search"></i></Link>
            </div> : <div className="console-bar-so" >
                <Link className="link" to="#"><i className="fi-rr-rotate-right" onClick={handleRefresh}></i></Link>
                <Link className="link" to="/search-stream"><i className="fi-rr-search"></i></Link>
                </div>}
                <ul className="cards" >
            {streams.slice(0).reverse().map( (s) => <li className="zoomincard" key={s.key} ><StreamItem stream={s} /></li> )}
        </ul>
        </div>
        );
    }

export default ListStream;