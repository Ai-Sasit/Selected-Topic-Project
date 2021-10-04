import React ,{useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {fetchimages} from '../../actions';
import { Link } from 'react-router-dom';

function Index(props) {
    const dispatch = useDispatch();
    const images = useSelector(state => Object.values(state.image))

    useEffect(() => {
        dispatch(fetchimages());// eslint-disable-next-line
    },[])

    return (
        <ul className="cards" >
            {images.slice(0).reverse().map( (s) => <li className="zoomincard" key={s.id} >
                <Link className={`card`} to={`/show-img/${s.id}`}>{/* eslint-disable-next-line*/}
                    <img src={s.image} className="card-img"/>
                </Link>
            </li> )}
        </ul>
    )
}

export default Index;