import { useEffect } from "react";

export default function Redirect() {
    useEffect(() => {
        window.location.replace("/signin");
    }, []);
    return (<></>);
}
