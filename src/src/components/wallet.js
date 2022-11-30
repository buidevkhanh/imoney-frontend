import { useEffect, useRef, useState } from "react";
import { userCreateWallet, userGetWallet, userRemoveWallet } from "../api/wallet";
import Footer from "./footer";

export default function Wallet(){
    const [wallet, setWallet] = useState([]);
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const name = useRef();
    const balance = useRef();
    const currency = 'USD';

    function addWallet() {
        const nametxt = name.current.value;
        if(!nametxt) {
            setError('wallet name can not be blank')
        }
        userCreateWallet({name: nametxt, balance: balance.current.value || 0, currency}).then(() => {
            setShow(false);
            userGetWallet().then((data) => {
                setWallet(data.data.data);
            })
        }).catch((error) => {
            setError(error?.response?.data?.message || 'System error');
        })
    }

    function removeWallet(id) {
        userRemoveWallet(id).then(() => {
            userGetWallet().then((data) => {
                setWallet(data.data.data);
            })
        }).catch((error) => {  
            window.location.replace("/signin");
        }).finally(() => {
            setConfirm("");
        })
    }

    useEffect(() => {
        userGetWallet().then((data) => {
            setWallet(data.data.data);
        })
    }, []);

    const renderWallet = wallet ? wallet.map((item, index) => {
        return (
            <>
                <div  key={index} className="wallet-info px-2 my-1 py-2 bg-white d-flex justify-content-center align-items-center" style={{border: '2px solid #363853', borderRadius: '3px'}}>
                    <div className="currency-logo usd p-3 py-4 bg-white text-center" style={{border: '2px solid #363853', borderRadius: '4px', width: '20%'}}>
                        {item.currency}
                    </div>
                    <div className="wallet-info px-3 bg-white" style={{width: '75%'}}>
                        <h6 className="text-secondary bg-white">{item.name}</h6>
                        { item.balance > 0 ? <h5 className="text-success-main bg-white">${item.balance}</h5> : 
                        <h5 className="text-danger-main bg-white">${item.balance}</h5>}
                    </div>
                    <div className="wallet-info px-3 bg-white" style={{width: '5%'}}>
                        <i className="far fa-trash-alt bg-white text-danger" onClick={() => setConfirm(item._id)} aria-hidden="true" style={{fontSize: '20px'}}></i>
                    </div>
                </div>
            </>
        )
        
    }): null;

    return (
        <>
            { show ?
            <div className="position-absolute d-flex jusitfy-content-center align-items-center" style={{backgroundColor: '#00000055', top: '28px', left: 0,  height: 'calc(100% - 28px)', borderRadius: '10px',width: '100%', zIndex: 1000}}>
                <div className="p-3 bg-white m-auto w-75 position-relative" style={{borderRadius: '5px'}}>
                    <i className="fas fa-times-circle bg-white text-danger position-absolute" onClick={() => {setShow(false)}} style={{right: '5px', top: '5px'}}></i>
                    <div className="text-secondary bg-white">
                        <h6 className="bg-white">Wallet name</h6>
                        <input className="input-style-1 w-100" onFocus={() => setError(null)} ref={name} placeholder="Wallet name"></input>
                    </div>
                    <div className="text-secondary bg-white mt-2">
                        <h6 className="bg-white">Wallet balance</h6>
                        <input className="input-style-1 w-100" onFocus={() => setError(null)} ref={balance} type="number" placeholder="0"></input>
                    </div>
                    <div className="text-secondary bg-white mt-2">
                        <h6 className="bg-white">Currency</h6>
                        <div className="d-flex bg-white justify-content-start align-items-center">
                            <div className="px-2 py-1 me-2 cursor text-main bg-white" style={{borderRadius: '2px', border: '2px solid #0012ff'}}>
                                USD
                            </div> 
                            <div className="px-2 py-1 me-2 cursor bg-secondary" style={{borderRadius: '2px', border: '2px solid #e3e3e3', color: '#e3e3e3 '}}>
                                VND
                            </div> 
                        </div> 
                    </div>
                    {error ? <div className="bg-white text-danger mt-1 text-center" style={{fontSize: '10px'}}>{error}</div> : null}
                    <input className="submit-style-1 w-100 text-white mt-3" onClick={() => addWallet()}type="submit" value={'Add wallet'}></input>
                </div> 
            </div>
            : null }
            {
                confirm ?
                <div className="position-absolute d-flex jusitfy-content-center align-items-center" style={{backgroundColor: '#00000055', top: '28px', left: 0,  height: 'calc(100% - 28px)', borderRadius: '10px',width: '100%', zIndex: 1000}}>
                <div className="p-3 bg-white m-auto w-75 position-relative" style={{borderRadius: '5px'}}>
                    <h6 className="bg-white">Are you sure to remove this item ? This action can't be redo</h6>
                    <div className="d-flex w-100 justify-content-center align-item-center mt-1 bg-white">
                        <div className="btn btn-danger w-25 mx-1" onClick={()=>removeWallet(confirm)}>Yes</div>
                        <div className="btn btn-secondary w-25 mx-1" onClick={()=>setConfirm("")}>No</div>
                    </div>
                </div> 
                </div>: null
            }
           <div className="profile-header py-2 px-3 bg-secondary d-flex justify-content-between align-items-center"
            style={{borderRadius: '20px'}}>
                <h4 className="bg-secondary p-0 m-0">My Wallet</h4>
                <i className="fa fa-plus bg-secondary" style={{fontSize: '22px'}} aria-hidden="true" onClick={() => setShow(true)}></i>
            </div>
            <div className="mt-3 px-1">
                {renderWallet}
            </div>
            <Footer/>
        </>
    )
}