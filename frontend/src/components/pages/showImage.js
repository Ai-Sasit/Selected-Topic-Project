import React , {useEffect, useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchimage, deleteimage} from '../../actions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Edit from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

function ShowImage(props) {

    const dispatch = useDispatch();
    const [img, setImg] = useState(null);
    const image = useSelector(state => state.image)

    useEffect(() =>{
        dispatch(fetchimage(props.match.params.id))// eslint-disable-next-line
    },[])
    // eslint-disable-next-line
    useEffect(() =>{
        try{
            setImg(image["undefined"][0]);
        }catch{}
    })

    const handleDelete = () =>{
        let secret = prompt("Please enter your Image Secret to delete");
        if (secret === img.secret){
            dispatch(deleteimage(img.id));
        }else if (secret !== img.secret && secret !== null){
            alert("Wrong Secret Password! Please try again");
        }
    }

    return img?<div className="BoxShow">{/* eslint-disable-next-line*/}
        <img src={`${img.image}`} className="showimg"/>
        <div className="backdown">
            <h1>{img.title}</h1>
            <h2>Description</h2>
            <h3>{img.desc}</h3>
            <h4>Picture Owner - {img.owner}</h4>
            <h4>Post Time - {img.time}</h4>
            <Stack spacing={2} direction="row">
                <Button 
                    variant="contained" 
                    color='error' 
                    startIcon={<DeleteForever/>} 
                    onClick={handleDelete}
                    size="large">
                    Delete
                </Button>
                <Link to={`/edit-img/${img.id}`} className="link-head">
                <Button 
                    variant="contained" 
                    color='success' 
                    startIcon={<Edit/>} 
                    size="large">
                    Edit
                </Button>
                </Link>
            </Stack>
        </div>
    </div>:(<div></div>)
}

export default ShowImage;