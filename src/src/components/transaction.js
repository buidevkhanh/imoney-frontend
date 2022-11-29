import { useEffect, useRef, useState } from "react";
import { userGetCategory } from "../api/category";
import { userCreateTransaction, userStatistic } from "../api/transaction";
import { userUpload } from "../api/user";
import { userGetWallet } from "../api/wallet";
import Footer from "./footer";

export default function Transaction(){
    const [type, setType] = useState('transfer');
    const [wallet, setWallet] = useState({name: 'No wallet selected'});
    const [category, setCategory] = useState({name: 'No category selected'});
    const [isWallet, setIsWallet] = useState(false);
    const [isCategory, setIsCategory] = useState(false);
    const [listCategory, setListCategory] = useState([]);
    const [listWallet, setListWallet] = useState([]);
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const [error, setError] = useState();
    const [success, setSuccess] = useState();

    const note = useRef();
    const date = useRef();
    const ammout = useRef();

    window.addEventListener('click', (e) => {
        setError(null);
        setSuccess(null);
        if(!e.srcElement?.offsetParent?.classList?.contains('wallet-list') && !e.srcElement.classList.contains('show-wallet')) {
            setIsWallet(false);
        }
        if(!e.srcElement?.offsetParent?.classList?.contains('category-list') && !e.srcElement.classList.contains('show-category')) {
            setIsCategory(false);
        }
    })

    function clearForm() {
        ammout.current.value = null;
        setWallet({name: 'No wallet selected'});
        setCategory({name: 'No category selected'});
        note.current.value = null;
        setPreview(null);
        setIsWallet(false);
        setIsCategory(false);
        setType('transfer');
        setFile(null);
        document.getElementById('upload').value = null;
        date.current.value = null;
    }

    function userTransaction() {
        if(!ammout.current.value && ammout.current.value < 0) {
            setError('invalid ammout');
            return;
        }
        if(!category._id) {
            setError('invalid category');
            return;
        }
        if(!wallet._id) {
            setError('invalid wallet');
            return;
        }
        if(file) {
            userUpload(file).then((data) => {
                const path = data.data.path;
                userCreateTransaction({
                    avatar: path,
                    ammout: ammout.current.value,
                    category: category._id,
                    wallet: wallet._id,
                    note: note.current.value || "",
                    date: date.current.value || new Date(),
                    type
                }).then(() => {
                    setSuccess('Create transaction successful');
                    clearForm();
                }).catch((error) => {
                    setError(error.response.data.message);
                })
            })
        } else {
            userCreateTransaction({
                ammout,
                category,
                wallet,
                note: note.current.value || "",
                date: date.current.value || new Date(),
                type
            }).then(() => {
                setSuccess('Create transaction successful');
                clearForm();
            }).catch((error) => {
                setError(error.response.data.message);
            })
        }
    }

    function changePreview(event){
        const file = event.target.files[0];
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
             setPreview(e.target.result);
        }
        reader.readAsDataURL(file);
     }

    useEffect(() => {
        userGetWallet().then((data) => {
            setListWallet(data.data.data);
        }).catch(() => {
            window.location.replace("/signin");
        })
        userGetCategory().then((data) => {
            console.log(data.data.data);
            setListCategory(data.data.data);
        }).catch(() => {
            window.location.replace("/signin");
        })
    }, []);

    return (
        <>
           <div className="profile-header py-2 px-3 bg-secondary d-flex justify-content-between align-items-center"
            style={{borderRadius: '20px'}}>
                <h4 className="bg-secondary p-0 m-0">Create Transaction</h4>
                <h6 className="bg-secondary cursor" onClick={() => window.location.replace('/profile')}>Back</h6>
            </div>
            <div className="mt-3 px-4 position-relative bg-secondary" style={{height: '762px', overflowY: 'scroll'}}>
                <div className="d-flex justify-content-center bg-secondary px-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i class="fas fa-coins bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}} className="d-flex justify-content-center align-items-end bg-secondary">
                        <div style={{width: '90%'}}>
                            <input className="input-style-2 bg-secondary" ref={ammout} placeholder="0"></input>
                        </div>
                        <div className="mx-2 bg-secondary bold" style={{width: '10%'}}>
                            USD
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center bg-secondary px-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i class="fas fa-list bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}} className="d-flex position-relative justify-content-center align-items-end bg-secondary">
                        <div style={{width: '90%'}}>
                            <input className="input-style-2 cursor bg-secondary" readOnly value={category.name}></input>
                            { isCategory ? <div className="wallet-list border border-secondary w-100 bg-white position-absolute" style={{top: '40px', maxHeight: '172px', overflowY: 'scroll', zIndex: 100}}>
                                {
                                    listCategory && listCategory.length > 0 ? listCategory.map((item, index) => {
                                        return (
                                            <div key={index} className="cursor wallet-item px-2 py-1 bg-white d-flex justify-content-between align-items-center"
                                            onClick={() => {setCategory(item); setIsCategory(false)}}>
                                                <span className="d-flex justify-content-center bold align-items-center border border-secondary" style={{backgroundColor: '#ffffffff', width: '40px', height: '40px', borderRadius: '5px'}}>
                                                <img width="40px" height="40px" src={item.avatar ? `http://localhost:8080/api/v1/albums/${item.avatar}` : 'http://localhost:8080/api/v1/albums/system-default-category.jpg'} alt="cate" style={{borderRadius: '5px'}}/>
                                                </span>
                                                <span className="bg-white" style={{width: 'calc(100% - 55px)'}}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        )
                                    }) : 
                                    <div className="cursor wallet-item px-2 py-1 bg-white d-flex justify-content-between align-items-center">
                                        <span className="bg-white text-center" style={{width: 'calc(100%)'}}>
                                            No category found
                                        </span>
                                    </div>
                                }
                            </div> : null }
                        </div>
                        <div className="mx-2 bg-secondary bold text-end" style={{width: '10%'}}>
                            <i class="fas fa-exchange-alt show-category bg-secondary" onClick={() => setIsCategory(!isCategory)}></i>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center bg-secondary px-2 mt-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i className="far fa-edit bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}} className="d-flex position-relative justify-content-center align-items-end bg-secondary">
                        <div className="bg-white" style={{width: '282px'}}>
                            <input type="text" className="input-style-2 bg-secondary" ref={note} placeholder="Note"></input>
                        </div>
                        <div className="bg-secondary" style={{width: 'calc(100% - 282px)'}}>
                            <i class="fas fa-sync-alt bg-secondary" style={{marginLeft: '20px'}} onClick={() => note.current.value=null}></i>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center bg-secondary px-2 mt-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i className="far fa-calendar bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}}>
                        <input type="date" ref={date} className="input-style-2 bg-secondary" placeholder="Note"></input>
                    </div>
                </div>
                <div className="d-flex justify-content-center bg-secondary px-2 mt-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i className="fas fa-wallet bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}} className="d-flex position-relative justify-content-center align-items-end bg-secondary">
                        <div className="select-wallet bg-secondary" style={{borderBottom: '1px solid #363853', height: '38px', width: '90%'}}>
                            <input className="input-style-2 cursor bg-secondary" readOnly value={wallet.name}></input>
                            { isWallet ? <div className="wallet-list border border-secondary w-100 bg-white position-absolute" style={{top: '40px', maxHeight: '172px', overflowY: 'scroll'}}>
                                {
                                    listWallet && listWallet.length > 0 ? listWallet.map((item, index) => {
                                        return (
                                            <div key={index} className="cursor wallet-item px-2 py-1 bg-white d-flex justify-content-between align-items-center"
                                            onClick={() => {setWallet(item); setIsWallet(false)}}>
                                                <span className="d-flex justify-content-center bold align-items-center border border-secondary" style={{backgroundColor: '#ffffffff', width: '40px', height: '40px', borderRadius: '5px'}}>
                                                    USD
                                                </span>
                                                <span className="bg-white" style={{width: 'calc(100% - 55px)'}}>
                                                    {item.name}
                                                </span>
                                            </div>
                                        )
                                    }) : <div className="cursor wallet-item px-2 py-1 bg-white d-flex justify-content-between align-items-center">
                                                <span className="bg-white" style={{width: 'calc(100%)'}}>
                                                    No wallet found
                                                </span>
                                            </div>
                                }
                            </div> : null }
                        </div>
                        <div className="mx-2 bg-secondary bold text-end" style={{width: '10%'}}>
                            <i class="fas fa-exchange-alt show-wallet bg-secondary" onClick={() => setIsWallet(!isWallet)}></i>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center bg-secondary px-2 my-4">
                    <div className="logo bg-secondary d-flex justify-content-center align-items-center" style={{width: '10%'}}>
                        <i class="fas fa-dollar-sign bg-secondary" style={{fontSize: '25px'}}></i>
                    </div>
                    <div style={{width: '90%'}} className="d-flex justify-content-between bg-secondary align-items-center">
                        <div className={`bg-secondary cursor text-center py-2 ${type === 'transfer' ? "text-main border-main" : null}`} style={{border: '2px solid #363853', width: '49%'}}
                        onClick={() => setType('transfer')}>
                            Transfer
                        </div>
                        <div className={`bg-secondary cursor text-center py-2 ${type === 'receive' ? "text-main border-main" : null}`} style={{border: '2px solid #363853', width: '49%'}}
                        onClick={() => setType('receive')}>
                            Receive
                        </div>
                    </div>
                </div>
                <div className="text-secondary bg-secondary mt-1">
                    <h6 className="bg-secondary">Upload image</h6>
                    <div className="category-bound bg-white d-flex justify-content-center align-items-center" style={{width: '100%', height: '200px', borderRadius: '2px', border: '2px dashed #e3e3e3'}}>
                        <label htmlFor="upload">
                            {
                                !preview ?
                                <i class="fas fa-camera bg-white" style={{color: '#e3e3e3', fontSize: '40px'}}></i>
                                : 
                                <div className="position-relative">
                                    <i className="fas fa-times-circle bg-white text-danger position-absolute rounded" onClick={(e) => {e.preventDefault();setPreview(null); setFile(null); document.getElementById("upload").value = null}} style={{right: '-5px', top: '-5px'}}></i>
                                    <img src={preview} width="100px" height={"100px"} alt="preview"/>
                                </div>
                            }
                        </label>
                    </div>
                    <input type="file" onChange={(e) => changePreview(e)} style={{visibility: "hidden", display: 'none'}} accept={"image/*"} id="upload"/>
                </div>
                { error ? <p className="m-0 p-0 text-danger bg-secondary text-center mt-2" style={{fontSize: '12px'}}>{error}</p> : null }
                { success ? <p className="m-0 p-0 text-success bg-secondary text-center mt-2" style={{fontSize: '12px'}}>{success}</p> : null }
                <input type="submit" className="submit-style-1 text-white mt-4" value={"Create Transaction"} onClick={() => userTransaction()}/>
            </div>
        </>
    )
}