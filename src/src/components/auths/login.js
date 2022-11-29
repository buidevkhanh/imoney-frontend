import { useEffect, useRef, useState } from "react";
import { userLogin, userValid } from "../../api/user";
import { setCookie } from "../../libs";

export default function Login(){
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState();

    useEffect(() => {
        userValid().then(() => {
            window.location.replace("/profile");
        })
    },[])

    function userSignIn() {
        if(!email.current.value) {
            setError(`Error: email can't be blank`);
            return;
        }
        if(!password.current.value) {
            setError(`Error: password can't be blank`);
            return;
        }
        userLogin(email.current.value, password.current.value).then((data) => {
            setCookie("__token", data.data.public_token);
            window.location.replace("/profile");
        }).catch((error) => {
            setError(error?.response?.data?.message || 'System error');
        })
    }
    return(
        <>
            <div className="login-screen bg-secondary d-flex flex-column justify-content-center align-items-center">
                <div className="large-logo bg-secondary position-relative w-100">
                    <div className="logo-layer-1 position-absolute bg-main rounded"></div>
                    <div className="logo-layer-2 position-absolute bg-main rounded"></div>
                    <div className="logo-sub-1 position-absolute bg-main rounded"></div>
                    <div className="logo-sub-2 position-absolute bg-main rounded"></div>
                </div>
                <div className="my-5">
                    <h4 className="p-0 m-0 bg-secondary">Best way to save Your Money.</h4>
                </div>
                <div class="login-form px-4 w-100 bg-secondary">
                <h6 className="bg-secondary text-secondary w-100 text-left">Email Address</h6>
                <input className="input-style-1 w-100 p-2" onFocus={()=>setError(null)} ref={email} placeholder="example@gmail.com"></input>
                <h6 className="bg-secondary text-secondary w-100 text-left mt-4" placeholder="password">Password</h6>
                <input className="input-style-1 w-100 p-2" type="password" onFocus={()=>setError(null)} ref={password} placeholder="password"></input>
                <input className="submit-style-1 bg-main text-white w-100 mt-4" type="submit" value="Sign In" onClick={() => userSignIn()}></input>
                { error ? <p className="m-0 p-0 text-danger bg-secondary text-center mt-2" style={{fontSize: '12px'}}>{error}</p> : null }
                </div>
                <div className="text-center mt-5 bg-secondary">
                    <p className="bg-secondary">I'm new user. <span className="text-main cursor bg-secondary bold" onClick={() => window.location.replace('/signup')}>Signup</span></p>
                </div>
            </div>
        </>
    )
}