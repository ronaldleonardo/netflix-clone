import React, { useRef } from "react";
import { auth } from "../firebase";
import './SignUpScreen.css';

const SignUpScreen = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const toSignIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value,
        ).then((authUser) => {
            console.log(authUser);
        }).catch((error) => {
            alert(error.message);
        });
    };

    const toHome = () => {
        window.location.reload(false);
    };

    return(
        <div className="signUpScreen">
           <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="email" required placeholder="Email" />
                <input ref={passwordRef} type="password" required placeholder="Password" />
                <button type="submit" onClick={toSignIn}>Sign In</button>

                <h4>
                    <span className="signUpScreen__gray">New to Netflix? </span>
                    <span className="signUpScreen__link" onClick={toHome}>Sign Up now.</span> 
                </h4>
           </form>
        </div>
    );
};

export default SignUpScreen;