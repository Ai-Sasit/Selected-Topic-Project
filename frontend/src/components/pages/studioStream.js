import React , {useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../../actions';
import StreamItem from '../studioitems';


function StudioStream(props){
    const isSignedIn = useSelector(state => state.auth.isSignedIn);
    const profile = useSelector(state => state.auth.profile);
    const streams = useSelector(state => Object.values(state.stream));
    const dispatch = useDispatch();
    var user_id = null;

    try {
        user_id = profile["userId"]
    }catch(e) {}
    
    useEffect(() => {
        dispatch(fetchStreams());   
        checklogin();
        return () => {};// eslint-disable-next-line
    }, []);


    const checklogin = () => {
        if (isSignedIn){
            console.log("Login",true,window.location.pathname);
        }else{
            console.log("Login",false,window.location.pathname)
        }
    }

    const handleRefresh = () => {
        window.location.reload();
    }

    const filters = streams.filter((s)=>{return s.userId === user_id})
    
    return (<div>
            <div className="console-bar">
                <Link className="link" to="#"><i className="fi-rr-rotate-right" onClick={handleRefresh}></i></Link>
                <Link className="link" to="/create-stream"><i className="fi-rr-add"></i></Link>
                <Link className="link" to="/studio"><i className="fi-rr-pulse"></i></Link>
                <Link className="link" to="/search-stream"><i className="fi-rr-search"></i></Link>
            </div>
                <ul className="lists-studio" >
            {filters.slice(0).reverse().map( (s) => <li className="listitems" key={s.key} ><StreamItem stream={s} pop={props} /></li> )}
        </ul>
        </div>
        );
    }

export default StudioStream;