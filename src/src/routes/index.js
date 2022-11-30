import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/auths/login";
import Profile from "../components/profile";
import Register from "../components/auths/register";
import Wallet from "../components/wallet";
import Category from "../components/category";
import Transaction from "../components/transaction";
import Statistic from "../components/statistic";
import Redirect from "../components/redirect";

export default function BaseRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/signin" element={<Login/>}></Route>
                <Route exact path="/signup" element={<Register/>}></Route>
                <Route exact path="/profile" element={<Profile/>}></Route>
                <Route exact path="/wallet" element={<Wallet/>}></Route>
                <Route exact path="/category" element={<Category/>}></Route>
                <Route exact path="/transaction" element={<Transaction/>}></Route>
                <Route exact path="/report" element={<Statistic/>}></Route>
                <Route path="/*" element={<Redirect/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}