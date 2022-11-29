import { useEffect, useRef, useState } from "react";
import { userCreateCategory, userGetCategory, userRemoveCategory } from "../api/category";
import { userUpload } from "../api/user";
import Footer from "./footer";

export default function Category(){
    const [category, setCategory] = useState([]);
    const [show, setShow] = useState(false);
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const name = useRef();

    useEffect(() => {
        userGetCategory().then((data) => {
            setCategory(data.data.data);
        })
    }, []);

    const renderCategory = category ? category.map((item, index) => {
        return (
            <>
                <div  key={index} className="cursor category-info px-3 my-1 py-2 bg-white d-flex justify-content-center align-items-center" style={{borderRadius: '3px', border: '1px solid white'}}>
                    <div className="currency-logo usd p-3 py-0 bg-white d-flex justify-content-end align-items-center" style={{borderRadius: '4px', width: '20%'}}>
                        <img width='60px' height='60px' className="bg-white" style={{borderRadius: '5px'}} src={item.avatar ? 'http://localhost:8080/api/v1/albums/' + item.avatar : 'http://localhost:8080/api/v1/albums/system-default-category.jpg'} alt="cate"/>
                    </div>
                    <div className="wallet-info px-3 bg-white" style={{width: '75%'}}>
                        <h5 className="text-secondary bg-white">{item.name}</h5>
                    </div>
                    <div className="wallet-info px-3 bg-white" style={{width: '5%'}}>
                        <i class="far fa-trash-alt bg-white text-danger" onClick={() => setConfirm(item._id)} aria-hidden="true" style={{fontSize: '20px'}}></i>
                    </div>
                </div>
            </>
        )
        
    }): null;

    function changePreview(event){
       const file = event.target.files[0];
       setFile(file);
       const reader = new FileReader();
       reader.onload = (e) => {
            setPreview(e.target.result);
       }
       reader.readAsDataURL(file);
    }

    function createCategory() {
        const nametxt = name.current.value;
        if(!nametxt) {
            setError("name can not be blank");
            return;
        }
        if(file) {
            userUpload(file).then((data) => {
                const path = data.data.path;
                userCreateCategory({name: nametxt, avatar: path}).then(() => {
                    setShow(false);
                    userGetCategory().then((data) => {
                        setCategory(data.data.data);
                    })
                }).catch((error) => {
                    setError(error?.response?.data?.message || 'System error');
                })
            })
        } else {
            userCreateCategory({name: nametxt}).then(() => {
                setShow(false);
                userGetCategory().then((data) => {
                    setCategory(data.data.data);
                })
            }).catch(() => {
                window.location.replace("/signin");
            })
        }
    }

    function removeCategory(id) {
        userRemoveCategory(id).then(() => {
            userGetCategory().then((data) => {
                setCategory(data.data.data);
            })
            setConfirm("");
        }).catch(() => {
            window.location.replace("/signin");
        })
    }

    return (
        <>
             { show ?
                <div className="position-absolute d-flex jusitfy-content-center align-items-center" style={{backgroundColor: '#00000055', top: '28px', left: 0,  height: 'calc(100% - 28px)', borderRadius: '10px',width: '100%', zIndex: 1000}}>
                    <div className="p-3 bg-white m-auto w-75 position-relative" style={{borderRadius: '5px'}}>
                        <i className="fas fa-times-circle bg-white text-danger position-absolute" onClick={() => {setShow(false)}} style={{right: '5px', top: '5px'}}></i>
                        <div className="text-secondary bg-white">
                            <h6 className="bg-white">Category name</h6>
                            <input className="input-style-1 w-100" onFocus={() => setError(null)} ref={name} placeholder="Category name"></input>
                        </div>
                        <div className="text-secondary bg-white mt-1">
                            <h6 className="bg-white">Upload image</h6>
                            <div className="category-bound bg-white d-flex justify-content-center align-items-center" style={{width: '100%', height: '200px', borderRadius: '2px', border: '2px dashed #e3e3e3'}}>
                                <label htmlFor="upload" onClick={()=>setError("")}>
                                    {
                                        !preview ?
                                        <i class="fas fa-camera bg-white" style={{color: '#e3e3e3', fontSize: '40px'}}></i>
                                        : 
                                        <div className="position-relative">
                                            <i className="fas fa-times-circle bg-white text-danger position-absolute rounded" onClick={(e) => {e.preventDefault();setPreview(null); setFile(null); document.getElementById('upload').value = null}} style={{right: '-5px', top: '-5px'}}></i>
                                            <img src={preview} width="100px" height={"100px"} alt="preview"/>
                                        </div>
                                    }
                                </label>
                            </div>
                            <input type="file" onChange={(e) => changePreview(e)} style={{visibility: "hidden", display: 'none'}} accept={"image/*"} id="upload"/>
                        </div>
                        {error ? <div className="bg-white text-danger mt-1 text-center" style={{fontSize: '10px'}}>{error}</div> : null}
                        <input className="submit-style-1 w-100 text-white mt-3" onClick={() => {createCategory()}}ntype="submit" value={'Add category'}></input>
                    </div> 
                </div>
            : null }
            {
                confirm ?
                <div className="position-absolute d-flex jusitfy-content-center align-items-center" style={{backgroundColor: '#00000055', top: '28px', left: 0,  height: 'calc(100% - 28px)', borderRadius: '10px',width: '100%', zIndex: 1000}}>
                <div className="p-3 bg-white m-auto w-75 position-relative" style={{borderRadius: '5px'}}>
                    <h6 className="bg-white">Are you sure to remove this item ? This action can't be redo</h6>
                    <div className="d-flex w-100 justify-content-center align-item-center mt-1 bg-white">
                        <div className="btn btn-danger w-25 mx-1" onClick={()=>{removeCategory(confirm)}}>Yes</div>
                        <div className="btn btn-secondary w-25 mx-1" onClick={()=>setConfirm("")}>No</div>
                    </div>
                </div> 
                </div>: null
            }
           <div className="profile-header py-2 px-3 bg-secondary d-flex justify-content-between align-items-center"
            style={{borderRadius: '20px'}}>
                <h4 className="bg-secondary p-0 m-0">My Category</h4>
                <i className="fa fa-plus bg-secondary" style={{fontSize: '22px'}} aria-hidden="true" onClick={() => setShow(true)}></i>
            </div>
            <div className="mt-3 px-1 position-relative bg-secondary" style={{height: '762px', overflowY: 'scroll'}}>
                {renderCategory}
            </div>
            <Footer/>
        </>
    )
}