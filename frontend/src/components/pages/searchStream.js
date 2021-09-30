import React , {useEffect, useState} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchStreams } from '../../actions';
import StreamItem from '../streamitem';

function SearchStream(props){
    const streams = useSelector(state => Object.values(state.stream))
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [searchlist, setSearchlist] = useState([]);
    // eslint-disable-next-line
    useEffect(() => {dispatch(fetchStreams()); return () => {};}, []);
    
    const handleSearch = () => {
        document.getElementById("default-cards").style.display = "none";
        document.getElementById("search-cards").style.display = "flex";
        setSearchlist(streams.filter((s)=>{return s.title.toLowerCase().includes(keyword.toLowerCase())}))
    }
    
    return (<div>
                <div className="console-bar-sign-out" >
                    <input type="text" className="search" name="search" onChange={(e) => {setKeyword(e.target.value)}}/>
                    <button className="search-bt" onClick={handleSearch}>Search</button>
                </div>
                <ul className="cards" id="default-cards">
                    {streams.slice(0).reverse().map( (s) => <li className="zoomincard" key={s.key} ><StreamItem stream={s} /></li> )}
                </ul>
                <ul className="cards" id="search-cards">
                    {searchlist.slice(0).reverse().map( (s) => <li className="zoomincard" key={s.key} ><StreamItem stream={s} /></li> )}
                </ul>
            </div>
        );
    }

export default SearchStream;