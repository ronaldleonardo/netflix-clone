import React, { useRef } from "react";
import { auth } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav";
import './SignUpForm.css';

const SignUpForm = () => {
    const location = useLocation();
    const loginPageEmail = location.state;
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(
            loginPageEmail,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser);
        }).catch(error => {
            alert(error.message);
        });

        navigate('/');

    }; 
    

    return(
        <>
            <Nav additional__class="nav__bottomBorder"/>
            <div className="signUpForm">
            <form>
                    <h1>Welcome Back! Joining Netflix is easy</h1>
                    <h3>Enter your password and you'll be watching in no time.</h3>
                    <span className="email__prompt">Email</span>
                    <h4>{loginPageEmail}</h4>
                    <input ref={passwordRef} type="password" placeholder="Enter your password" />
                    <button type="submit" onClick={register}>Sign Up</button>

                    <h4>

                    </h4>
            </form>
            </div>
        </>
    );
};


export default SignUpForm;