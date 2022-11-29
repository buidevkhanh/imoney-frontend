import { useState } from "react";
import BaseRoutes from "../routes";

function App() {
    const [now, setNow] = useState(`${new Date().getHours() >=10 ? new Date().getHours() : '0' + new Date().getHours()}:${new Date().getMinutes() >= 10 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`);
    setInterval(() => {
        const current =  `${new Date().getHours() >=10 ? new Date().getHours() : '0' + new Date().getHours()}:${new Date().getMinutes() >= 10 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`;
        setNow(current)
    }, 5000);
    return (
        <div className="root-container">
            <div className="root-screen bg-white w-100">
                <div className="camera"></div>
                <div className="phone-head">
                    <div className="phone-notify-left position-absolute top-0 right-100 px-2">
                        <small className="bg-white">4G</small><i className="fas fa-signal mx-1"></i>
                        <i className="fas fa-wifi ms-2"></i>
                    </div>
                    <div className="phone-notify-right position-absolute top-0 left-100 px-2">
                        <small className="m-0 p-0 bg-white">{now}</small>
                        <i className="fas fa-battery-three-quarters ms-2"></i>
                    </div>
                </div>
                <div className="root-website bg-secondary w-100">
                  <BaseRoutes/>
                </div>
            </div>
        </div>
    )
}

export default App;
