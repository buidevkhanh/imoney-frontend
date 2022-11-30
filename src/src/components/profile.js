import { useEffect, useState } from "react";
import { userGetInfo, userUpdateInfo, userUpload } from "../api/user";
import { eraseCookie } from "../libs";
import Footer from "./footer";

export default function Profile() {
    
    const [profile, setProfile] = useState();

    useEffect(() => {
        userGetInfo().then((data) => {
            setProfile(data.data.data);
        }).catch(() => {
            window.location.replace("/signin")
        })
    }, []);

    function updateAvatar() {
        const file = document.querySelector('#upload').files[0];
        userUpload(file).then((data)=>{
            const path = data.data.path;
            userUpdateInfo({avatar: path}).then(()=>{
                window.location.reload();
            })
        })
    }

    return (
        <>
            <div className="profile-header py-2 px-3 bg-secondary d-flex justify-content-between align-items-center"
            style={{borderRadius: '20px'}}>
                <h4 className="bg-secondary p-0 m-0">My Profile</h4>
                <i className="fa fa-cog bg-secondary" style={{fontSize: '22px'}}aria-hidden="true"></i>
            </div>
            <div className="userinfo text-center bg-secondary py-5">
                <div className="user-avatar bg-secondary">
                    <div className="upload-avatar position-relative bg-secondary">
                        <img className="bg-secondary" src={`http://localhost:8080/api/v1/albums/${profile?.avatar || 'system-default-avatar.png'}`} alt="user avatar" width="120px" height="120px" style={{borderRadius: '50%'}}/>
                        <label htmlFor="upload" className="m-0 p-0">
                            <i className="fas fa-camera bg-secondary position-absolute bottom-0 left-50" style={{left: '50%', transform: 'translateX(-50%)', fontSize: '20px', color: "#a3a3a3"}}></i>
                        </label>
                        <input type="file" onChange={() => updateAvatar()} accept={'image/*'} style={{visibility: "hidden"}} id="upload"/>
                    </div>
                    <div className="bold cursor mt-3 bg-secondary text-main">{profile?.fullname || 'Anonymous User'}</div> 
                    <div className="text-secondary mt-2 bg-secondary">{profile?.email || 'Unknow email'}</div>
                </div>
            </div>
            <div className="general px-4 bg-secondary">
                <h4 className="text-main bg-secondary">General</h4>
                <div className="funcs cursor d-flex justify-content-center align-items-center my-3 bg-secondary" onClick={() => window.location.replace('/wallet') } style={{fontSize: '18px'}}>
                    <i className="fas fa-wallet me-2 bg-secondary" style={{width: '10%'}}></i>
                    <div className="text-secondary bg-secondary" style={{width: '65%'}}>My Wallet</div>
                    <div className="bg-secondary w-25 text-end bg-secondary">
                        <i className="fa fa-angle-right bg-secondary" aria-hidden="true" style={{color: 'inherit'}}></i>
                    </div>
                </div>
                <div className="funcs cursor d-flex justify-content-center align-items-center my-3 bg-secondary" style={{fontSize: '18px'}}>
                    <i className="fa fa-wrench me-2 bg-secondary" style={{width: '10%'}}></i>
                    <div className="text-secondary bg-secondary" style={{width: '65%'}}>Tools</div>
                    <div className="bg-secondary w-25 text-end bg-secondary">
                        <i className="fa fa-angle-right bg-secondary" aria-hidden="true" style={{color: 'inherit'}}></i>
                    </div>
                </div>
                <div className="funcs cursor d-flex justify-content-center align-items-center my-3 bg-secondary" style={{fontSize: '18px'}}>
                    <i className="fas fa-shield-alt me-2 bg-secondary" style={{width: '10%'}}></i>
                    <div className="text-secondary bg-secondary" style={{width: '65%'}}>Privacy</div>
                    <div className="bg-secondary w-25 text-end bg-secondary">
                        <i className="fa fa-angle-right bg-secondary" aria-hidden="true" style={{color: 'inherit'}}></i>
                    </div>
                </div>
                <div className="funcs cursor d-flex justify-content-center align-items-center my-3 bg-secondary" style={{fontSize: '18px'}}>
                    <i className="fa fa-info-circle me-2 bg-secondary" style={{width: '10%'}}></i>
                    <div className="text-secondary bg-secondary" style={{width: '65%'}}>About</div>
                    <div className="bg-secondary w-25 text-end bg-secondary">
                        <i className="fa fa-angle-right bg-secondary" aria-hidden="true" style={{color: 'inherit'}}></i>
                    </div>
                </div>
                <div className="funcs cursor d-flex justify-content-center align-items-center my-3 bg-secondary" style={{fontSize: '18px'}}
                onClick={() => {eraseCookie("__token"); window.location.replace("/signin")}}>
                    <i className="fas fa-sign-out-alt me-2 bg-secondary" style={{width: '10%'}}></i>
                    <div className="text-secondary bg-secondary" style={{width: '65%'}}>Logout</div>
                    <div className="bg-secondary w-25 text-end bg-secondary">
                        <i className="fa fa-angle-right bg-secondary" aria-hidden="true" style={{color: 'inherit'}}></i>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}