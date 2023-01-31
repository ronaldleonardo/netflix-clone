import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import Loader from "../Loader";
import './SignInScreen.css';

const SignInScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [isLoadingButton, setIsLoadingButton] = useState(false);


    const toSignIn = (e) => {
        setIsLoadingButton(true);
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            setIsLoadingButton(false);
        }).catch((error) => {
            setIsLoadingButton(false);
            alert(error.message);

        });
    };

    const toHome = () => {
        window.location.reload(false);
    };

    return(
        <div className="signInScreen">
           <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" required placeholder="Email" />
                <input ref={passwordRef} type="password" required placeholder="Password" />
                
                {!isLoadingButton && <button type="submit" onClick={toSignIn}>Sign In</button>}
                {isLoadingButton && <button disabled><Loader/></button>}

                <h4>
                    <span className="signInScreen__gray">New to Netflix? </span>
                    <span className="signInScreen__link" onClick={toHome}>Sign Up now.</span> 
                </h4>
           </form>
        </div>
    );
};

export default SignInScreen;