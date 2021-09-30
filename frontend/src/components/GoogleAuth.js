import React , {useEffect,useState} from "react";
import { loadAuth2, gapi } from 'gapi-script';
import { connect } from 'react-redux';
import { signIn, signOut } from './../actions';

function GoogleAuth(props) {

    var auth2 = null;
    const [Auth,setAuth] = useState("");

    const initAuth = async () => {
        auth2 = await loadAuth2(gapi, process.env.REACT_APP_OAUTH_CLIENT_ID, "email")
        setAuth(auth2);
        onAuthChange(auth2.isSignedIn.get());
        auth2.isSignedIn.listen(onAuthChange)
        };

    useEffect(() => {
        try{
            initAuth();
        }catch(e){
            console.warn(e.message);
        }// eslint-disable-next-line
    }, []);

    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            let getProfile = auth2.currentUser.get().getBasicProfile();
            let uid = getProfile.getId();
            let name = getProfile.getName();
            let email = getProfile.getEmail();
            let img = getProfile.getImageUrl();
            let payload = {"userId": uid ,"userName": name ,"userEmail": email ,"userImg": img};
            props.signIn(payload);
        }
        else {
            props.signOut();
        }
    } 
    const onSignInClick = () => { Auth.signIn() }
    const onSignOutClick = () => { Auth.signOut() }
    
    return (props.isSignedIn?
    <button className="bt-google sign-out" onClick={onSignOutClick}>Sign Out</button>
    :
    <button className="bt-google sign-in" onClick={onSignInClick}>Google Sign In</button>
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
