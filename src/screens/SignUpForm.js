import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import './SignUpForm.css';
import Loader from "../Loader";

const SignUpForm = () => {
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const location = useLocation();
    const loginPageEmail = location.state;
    const passwordRef = useRef(null);
    const navigate = useNavigate();


    const register = (e) => {
        setIsLoadingButton(true);
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            loginPageEmail,
            passwordRef.current.value
        ).then((authUser)=>{
            setIsLoadingButton(false);
            navigate('/');
        }).catch(error => {
            setIsLoadingButton(false);
            alert(error.message);
        });

    }; 
    

    return(
        <>
            <Nav additional__class="nav__bottomBorder nav__noProfile"/>
            <div className="signUpForm">
            <form onSubmit={()=>{}}>
                    <h1>Welcome Back! Joining Netflix is easy</h1>
                    <h3>Enter your password and you'll be watching in no time.</h3>
                    <span className="email__prompt">Email</span>
                    <h4>{loginPageEmail}</h4>

                    <input ref={passwordRef} type="password" required placeholder="Enter your password" />
                    
                    {!isLoadingButton && <button type="submit" onClick={register}>Sign Up</button>}
                    {isLoadingButton && <button disabled><Loader/></button>}

                    
            </form>
            </div>
        </>
    );
};


export default SignUpForm;