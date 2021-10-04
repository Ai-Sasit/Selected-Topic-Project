import React ,{useRef, useEffect , useState} from "react";
import { useDispatch , useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {updateimage , fetchimage} from '../../actions';
import { Link } from 'react-router-dom';

function EditImage(props){
    const title = useRef();
    const owner = useRef();
    const desc = useRef();
    const [img,setImg] = useState(null);
    const dispatch = useDispatch();
    const image = useSelector(state => state.image)

    useEffect(() =>{
        dispatch(fetchimage(props.match.params.id))
        try {setImg(image["undefined"][0])}catch(e){}// eslint-disable-next-line
    },[])

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));

    const handleSend = () => {
        let payload = {
            title: String(title.current.value),
            owner: String(owner.current.value),
            desc: String(desc.current.value),
            image: img.image,
            time: img.time,
            secret: img.secret,
        }
            console.log(payload)
            dispatch(updateimage(img.id ,payload));
        }

    return img?
    <Stack spacing={2} sx={{width: '80vh', mx: 'auto',mt:4,mb: 10, bgcolor:"#ffffff80", p:2 , boxShadow: 2}}>
        <Item sx={{fontSize: '5vh'}}>Image Update Form</Item>{/* eslint-disable-next-line*/}
        <Item><img src={img.image} alt="your image" width="100%" height="100%" /></Item>
        <Item>
            <TextField 
                id="outlined-basic" 
                label="Picture Title" 
                variant="outlined"
                inputRef={title}
                defaultValue={img.title}
                required
                sx={{width: '75vh'}} 
            />
        </Item>
        <Item>
            <TextField 
                id="outlined-basic" 
                label="Owner Name" 
                variant="outlined"
                inputRef={owner}
                defaultValue={img.owner}
                required
                sx={{width: '75vh'}} 
            />
        </Item>
        <Item>
            <TextField 
                id="outlined-basic"
                multiline
                rows={4}
                label="Description"
                inputRef={desc}
                defaultValue={img.desc}
                variant="outlined"
                sx={{width: '75vh'}} 
            />
        </Item>
        <Item>
            <Link to={`/show-img/${img.id}`} className="link-head">
            <Button 
                variant="contained" 
                size="large"
                color="error"
                sx={{width:'30vh', mr: 5}}>
                Cancel
            </Button>
            </Link>
            <Button 
                variant="contained" 
                size="large"
                onClick={handleSend}
                sx={{width:'30vh'}}>
                Update
            </Button>
        </Item>
      </Stack>
    :(<div></div>)
}
export default EditImage;