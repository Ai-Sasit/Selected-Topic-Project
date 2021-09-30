import React , {useState, useEffect} from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { editStream , fetchStream } from '../../actions';
import {storage} from '../../firebase/config';
import uploadimg from '../../firebase/Uploading.gif';


function EditStream(props) {
    const date_time = new Date().toLocaleString("th-TH", {timeZone: "Asia/Bangkok"});
    const [title, setTitle] = useState(null);
    const [img, setImg] = useState(null);
    const [imgurl, setImgurl] = useState(null);
    const [desc, setDesc] = useState(null);
    const [pathimg, setPathimg] = useState(null);
    const stream = useSelector(state => state.stream[props.match.params.key]);
    const isSignedIn = useSelector(state => state.auth.isSignedIn)

    const dispatch = useDispatch();

    const payload = { 
      "title": title,
      "desc": desc,
      "img_url": imgurl,
      "img_path": pathimg,
      "date_time":date_time
    };

    useEffect(() => {
        dispatch(fetchStream(props.match.params.key));
        checklogin();// eslint-disable-next-line
    }, []);

    const checklogin = () => {
      if (isSignedIn){
          console.log("Login",true,window.location.pathname);
      }else{
          console.log("Login",false,window.location.pathname)
          props.history.push("/");
      }
  }

    const handleSave = () => {
      if (imgurl && title && desc) {
        dispatch(editStream(props.match.params.key,payload))
        
      }else{
        alert("Saving Failed | need to add all input form.");
      }
    };
    
    const handleCancel = () => { window.location.replace("/studio") }

    const handleUpload = (e) => {
      storage.ref(stream.img_path).delete();
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
    
      return stream?<div className="addboard" >
      <br/>
      {/* eslint-disable-next-line*/}
      <img className="img-upload" id="pre-img" src={stream.img_url}/>
      <br/>
      <div className="req form__group field">
       <input type="file" className="form__field upload-in" accept="image/*" onChange={handleUpload}/>
       </div>
       <br/>
      <div className="req form__group field">
       <input type="input" className="form__field" placeholder="Name" onChange={(e) => setTitle(e.target.value)} required  />
       <label htmlFor="name" className="form__label">Title</label>
       </div>
       <br/>
       <div className="req form__group field">
       <textarea className="form__field desc_form" placeholder={stream.desc} onChange={(e) => setDesc(e.target.value)} required/>
       <label htmlor="name" className="form__label">Description</label>
       </div>
       <br/><br/><br/><br/>
       <div className="req form__group field" id="in-key-edit">
       <input type="input" className="form__field1" placeholder="Name" id="keys" disabled value={stream.key}/>
       <label htmlFor="name" className="form__label">Stream Key</label>
       </div>
       <div id="bt-edform"><button className="bt-Cancel" onClick={handleCancel}>Cancel</button>
       <button className="bt-Save" onClick={handleSave}>Save</button></div>
       <br/>
  </div>:(<div></div>);
  }
  
  export default EditStream;