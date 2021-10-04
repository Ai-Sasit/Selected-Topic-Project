import React ,{useRef}from "react";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileUpload from '@mui/icons-material/FileUpload';
import {createimage} from '../../actions';

function UploadImage(props){
    const title = useRef();
    const owner = useRef();
    const secret = useRef();
    const desc = useRef();
    const image = useRef();
    const date_time = moment().format('dddd DD MMMM YYYY');
    const dispatch = useDispatch();

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    
    const Input = styled('input')({
        display: 'none',
      });

    const handleUpload = (e) => {
        const blah = document.getElementById('blah');
        const imgup = document.getElementById('imgup');
        let [img] = e.target.files;
        let Read = new FileReader();
        Read.onload = (e) =>{
            blah.src = e.target.result;
            imgup.style.display="block";
        }
        Read.readAsDataURL(img);
    };

    const handleSend = () => {
        let reafer = new FileReader();
        reafer.onload = (e) => {
            let payload = {
                title: String(title.current.value),
                owner: String(owner.current.value),
                secret: String(secret.current.value),
                desc: String(desc.current.value),
                time: String(date_time),
                image: e.target.result
            }
            console.log(payload)
            dispatch(createimage(payload));
        }
        reafer.readAsDataURL(image.current.files[0])
    }

    return (
    <Stack spacing={2} sx={{width: '80vh', mx: 'auto',mt:4,mb: 10, bgcolor:"#ffffff80", p:2 , boxShadow: 2}}>
        <Item sx={{fontSize: '5vh'}}>Image Upload Form</Item>{/* eslint-disable-next-line*/}
        <Item id="imgup"><img id="blah" src="#" alt="your image" width="100%" height="100%" /></Item>
        <Item>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={handleUpload} ref={image}/>
                <Button 
                    variant="contained"
                    color='secondary' 
                    size="large" 
                    sx={{width:'75vh'}}
                    startIcon={<FileUpload/>}
                    component="span">
                    Upload Image
                </Button>
            </label>
        </Item>
        <Item>
            <TextField 
                id="outlined-basic" 
                label="Picture Title" 
                variant="outlined"
                inputRef={title}
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
                required
                sx={{width: '75vh'}} 
            />
        </Item>
        <Item>
            <TextField
                type="password" 
                id="outlined-basic" 
                label="Secret Password" 
                variant="outlined"
                inputRef={secret}
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
                variant="outlined"
                sx={{width: '75vh'}} 
            />
        </Item>
        <Item>
            <Button 
                variant="contained" 
                size="large"
                onClick={handleSend}
                sx={{width:'75vh'}}>
                SAVE
            </Button>
        </Item>
      </Stack>
    )
}
export default UploadImage;