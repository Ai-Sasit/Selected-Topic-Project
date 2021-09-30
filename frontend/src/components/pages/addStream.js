import React , {useState, useEffect} from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { createStream } from '../../actions';
import {storage} from '../../firebase/config';
import uploadimg from '../../firebase/Uploading.gif';


function AddStream(props) {
    const date_time = moment().format('dddd DD MMMM YYYY HH:mm');
    const [title, setTitle] = useState(null);
    const [img, setImg] = useState(null);
    const [imgurl, setImgurl] = useState(null);
    const [desc, setDesc] = useState(null);
    const [pathimg, setPathimg] = useState(null);
    const bt_create = document.getElementById("bt-create");
    const in_key = document.getElementById("in-key");
    const bt_hidden = document.getElementById("bt-hidden");
    const keys = document.getElementById("keys");
    const [skey,setskey] = useState(null);
    var userId = null;
    var userName = null;

    const profile = useSelector(state => state.auth.profile)
    const isSignedIn = useSelector(state => state.auth.isSignedIn)

    try {
      userId = profile["userId"];
      userName = profile["userName"];
    } catch (e) {};

    const payload = { 
      "title": title,
      "desc": desc,
      "img_url": imgurl,
      "img_path": pathimg,
      "userId": userId, 
      "streamer": userName,
      "date_time":date_time,
      "video_url": null,
    };

    useEffect(() => {
      checklogin()// eslint-disable-next-line
    }, []);

    const checklogin = () => {
      if (isSignedIn){
          console.log("Login",true,window.location.pathname);
      }else{
          console.log("Login",false,window.location.pathname)
          props.history.push("/");
      }
  }

    const handleCreate = () => {
      if (imgurl && title && desc) {
        bt_create.style.display = "none";
        createStream(payload).then(function(e){
        in_key.style.display="block";
        bt_hidden.style.display="flex";
        keys.value = e;
        setskey(e);
        });
      }else{
        alert("Creating Failed | need to add all input form.");
      }
    };
    
    const handleHome = () => { props.history.push("/"); }

    const handleUpload = (e) => {
      setImg(e.target.files[0]);
      let pre_img = document.getElementById("pre-img");
      pre_img.src = uploadimg;
    };

    if (img){
      console.log(img);
      setPathimg(`images/${img.name}`);
      const uploadTask = storage.ref(`images/${img.name}`).put(img);
      uploadTask.on(
        "state_changed",
        snapshot => {console.log("Uploading...", `${snapshot.bytesTransferred} bytes`);},
        error => {console.log(error);},
        () => {
          storage.ref("images").child(img.name).getDownloadURL().then(url => {
              setImgurl(url);
              let pre_img = document.getElementById("pre-img");
              pre_img.src = url;
            })
        }
        )
      setImg(null);
    }else{}
    
      return (
       <div className="addboard" >
           <br/>
           {/* eslint-disable-next-line*/}
           <img className="img-upload" id="pre-img" src="https://www.lifewire.com/thmb/P856-0hi4lmA2xinYWyaEpRIckw=/1920x1326/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"/>
           <br/>
           <div className="req form__group field">
            <input type="file" className="form__field upload-in" accept="image/*" onChange={handleUpload}/>
            </div>
            <br/>
           <div className="req form__group field">
            <input type="input" className="form__field" placeholder="Name" onChange={(e) => setTitle(e.target.value)} required />
            <label htmlFor="name" className="form__label">Title</label>
            </div>
            <br/>
            <div className="req form__group field">
            <textarea className="form__field desc_form" placeholder="Name" onChange={(e) => setDesc(e.target.value)} required/>
            <label htmlor="name" className="form__label">Description</label>
            </div>
            <br/><br/><br/><br/>
            <div className="req form__group field key_form" id="in-key">
            <input type="input" className="form__field1" placeholder="Name" id="keys" disabled />
            <label htmlFor="name" className="form__label">Stream Key</label>
            </div>
            <div id="bt-hidden"><button className="bt-home" onClick={handleHome}>Home</button>
            <Link to={`/play-stream/${skey}`}><button className="bt-live">Preview</button></Link>
            </div>
            <button className="bt-create" onClick={handleCreate} id="bt-create">Create</button>
            <div className="loader" id="loader"></div>
            <br/>
       </div>
      );
  }
  
  export default AddStream;