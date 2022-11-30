import { useEffect, useState } from "react"

export default function Footer(){
    const [active, setActive] = useState();
    useEffect(() => {
        const path = window.location.pathname.split("/").at(-1);
        setActive(path);
    }, []);
    return (
        <>
            <div className="position-absolute w-100 bottom-0"
            style={{fontSize: '20px',borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px'}}>
                <div className="footer bg-white position-relative w-100 py-4 px-5 d-flex justify-content-between align-items-center left-0 bg-white"
                style={{borderBottomLeftRadius: '50px', borderBottomRightRadius: '50px'}}>
                    <i className="fas fa-ellipsis-h bg-white text-center" style={{width: '8%', display: 'inline-block',  color: '#e3e3e3 !important'}}></i>
                    <i className="fas fa-chart-pie bg-white text-center"  style={{width: '47%', display: 'inline-block',  color: '#e3e3e3 !important'}}
                    onClick={() => { window.location.replace("/report")}}></i>
                    <div className="add-button bg-main rounded text-white position-absolute d-flex justify-content-center align-items-center"
                    style={{width: '60px',height: '60px', top: '-48%', left: '50%', transform: 'translateX(-45%)'}}
                    onClick={() => window.location.replace("/transaction")}>
                        <i className="add-icon fas fa-plus bg-main text-white"></i>
                    </div>
                    <i className={`fas fa-clipboard-list bg-white text-center ${active === 'category' ? 'active' : null}`}  style={{width: '47%', display: 'inline-block',  color: '#e3e3e3 !important'}}
                    onClick={() => {window.location.replace('/category')}}></i>  
                    <i className={`far fa-user bg-white text-center ${active === 'profile' ? 'active' : null}`} style={{width: '8', display: 'inline-block',  color: '#e3e3e3 !important'}}
                    onClick={() => {window.location.replace('/profile')}}></i>
                </div>
            </div>
        </>
    )
}