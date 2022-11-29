import { useState } from "react";
import { userGetCategory } from "../api/category";
import { userGetTransaction, userStatistic } from "../api/transaction";
import BarChart from "./chart";
import Footer from "./footer";

export default function Statistic() {
    const [range, setRange] = useState('week');
    const [categoryList, setCategoryList] = useState([]);
    const [category, setCategory] = useState('all');
    const [transactions, setTransactions] = useState([]);
    const [statistic, setStatistic] = useState([]);
    const [chart, setChart]  = useState(<></>);

    useState(() => {
        userGetTransaction().then((data) => {
            setTransactions(data.data);
        }).catch(() => {
            window.location.replace("/signin");
        })
        userGetCategory().then((data) => {
            setCategoryList(data.data.data);
        }).catch(() => {
            window.location.replace("/signin");
        })
        userStatistic().then((data) => {
            setStatistic(data.data);
            console.log(data.data.day_of_week_transfer);
            setChart(<BarChart type="this week" label={["Sun","Mon", "Tue", "Web", "Thu", "Fri", "Sat"]} data={{transfer: data.data.day_of_week_transfer, receive: data.data.day_of_week_receive}}/>)
        }).catch(() => {
            window.location.replace("/signin");
        })
    }, []);

    function getDateStr(input){
        const date = new Date(input);
        const month = date.getMonth();
        let str = "";
        const monthStr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        str += monthStr[month];
        str += " " + date.getDate();
        return str;
    }

    const renderTransactions = transactions ? transactions.map((item, index) => {
        return (
            <div className="transaction-item w-100 px-2 mt-2 py-2 bg-white d-flex justify-content-center align-items-center" style={{borderRadius: '5px'}}>
                <div className="pre text-start bg-white" style={{width: '15%'}}>
                    <img className="bg-white" src={item.avatar ? "http://localhost:8080/api/v1/albums/" + item.avatar : "http://localhost:8080/api/v1/albums/system-default-category.jpg"} alt="img" style={{width: "50px", height: "50px", borderRadius: '5px'}}/>
                </div>
                <div className="tran-info bg-white text-start" style={{width: '60%'}}>
                    <h5 className="mb-1 bg-white">{item.category.name}</h5>
                    <p className="text-secondary bg-white m-0 p-0">{item.note}</p>
                </div>
                <div className="tran-info-2 bg-white text-end" style={{width: '25%'}}>
                    <h5 className={`mb-1 bg-white ${item.type === 'transfer' ? 'text-danger-main' : 'text-success-main'}`}>{item.type === 'transfer' ? '-' : '+'}${item.ammout}</h5>
                    <p className="text-secondary bg-white m-0 p-0">{getDateStr(new Date(`${item.year}-${item.month}-${item.day}`))}</p>
                </div>
            </div> 
        )
    }) : null;

    const renderCategory = categoryList ? categoryList.map((item, index) => {
        return (
            <div className={`category py-1 px-2 d-inline-block cursor bg-white ${category === item.name ? 'text-main border border-main' : null}`} style={{borderRadius: '5px', margin: '0 5px'}}
            onClick={() => setCategory(item.name)}>{item.name}</div>
        )
    }) : [];

    renderCategory.unshift(<div className={`category py-1 px-2 d-inline-block cursor bg-white ${category === 'all' ? 'text-main border border-main' : null}`} style={{borderRadius: '5px', margin: '0 5px'}}
    onClick={() => setCategory('all')}>All</div>)

    return (
        <>
            <div className="profile-header py-2 px-3 bg-secondary d-flex justify-content-between align-items-center"
            style={{borderRadius: '20px'}}>
                <h4 className="bg-secondary p-0 m-0">My Report</h4>
            </div>
            <div className="chart text-center bg-secondary mt-1">
                <div className="d-flex justify-content-start align-items-center bg-secondary">
                    <div className={`month bg-white text-center cursor mx-1 py-1 ${range === 'all'?"text-main border bold border-main":null }`} style={{width: '100px', borderRadius: '5px'}}
                    onClick={() => {setRange('all');
                    setChart(<BarChart type="all" label={["Total"]} data={{transfer: [statistic.all_transfer], receive: [statistic.all_receive]}}/>)}}>All</div>
                    <div className={`month bg-white text-center cursor mx-1 py-1 ${range === 'week'?"text-main border bold border-main":null }`} style={{width: '100px', borderRadius: '5px'}}
                    onClick={() => {setRange('week');
                    setChart(<BarChart type="this week" label={["Sun","Mon", "Tue", "Web", "Thu", "Fri", "Sat"]} data={{transfer: statistic.day_of_week_transfer, receive: statistic.day_of_week_receive}}/>)}}>This week</div>
                    <div className={`month bg-white text-center cursor mx-1 py-1 ${range === 'year'?"text-main border  bold border-main":null }`} style={{width: '100px', borderRadius: '5px'}}
                    onClick={() => {setRange('year');
                    setChart(<BarChart type="this week" label={["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]} data={{transfer: statistic.month_of_year_transfer, receive: statistic.month_of_year_receive}}/>)}}>This Year</div>
                </div>  
            </div>
            <div className="chart bg-white py-1 d-flex justify-content-center align-items-center" style={{height: '420px'}}>
                {chart ? chart : null}
            </div>
            <h4 className="bg-secondary p-0 m-0 px-3 mt-1 text-main">Detail transactions</h4>
            <div className="all-category px-2 mt-1 py-2 bg-secondary" style={{width: '100%', overflowX: 'scroll'}}>
               {renderCategory}
            </div>
            <div className="transaction bg-secondary bg-white px-3" style={{maxHeight: '246px', overflowY: 'scroll'}}>
                {renderTransactions}
            </div>
            <Footer/>
        </>
    )
}