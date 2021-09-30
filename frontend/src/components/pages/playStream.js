import React ,{ createRef ,useEffect} from 'react';
import { useSelector , useDispatch} from 'react-redux'
import { fetchStream } from './../../actions';
import flv from 'flv.js';

function PlayStream(props) {

    const stream = useSelector(state => state.stream[props.match.params.key]);
    const videoRef = createRef();
    const dispatch = useDispatch();
    var player = null;

    useEffect(() => {
        dispatch(fetchStream(props.match.params.key));
        buildPlayer();
        return () => {
            player.destroy();
        }// eslint-disable-next-line
    },[])

    useEffect(() =>{
        buildPlayer();
    })

    const buildPlayer = () => {
        const key = props.match.params.key;
        if (flv.isSupported() && stream && stream.video_url) {
            player = flv.createPlayer({
                type: 'mp4',
                url: `${stream.video_url}`
            });
            player.attachMediaElement(videoRef.current);
            player.load();
        }else if (flv.isSupported() && stream){
            player = flv.createPlayer({
                type: 'flv',
                url: `https://4d2b-184-82-186-178.ap.ngrok.io/live/${key}.flv`
            });
            player.attachMediaElement(videoRef.current);
            player.load();
        }
    }


    return !stream?
            <div></div>
            :(<div>
                <video ref={videoRef} className="streamPlayer" controls></video>
                <div className="playerDesc">
                    <h1>{stream.title}</h1>
                    <h4>{stream.desc}</h4>
                    <h6>Stream by {stream.streamer}</h6>
                    <h6>Stream at {stream.date_time}</h6>
                </div>
            </div>);
}

export default PlayStream;