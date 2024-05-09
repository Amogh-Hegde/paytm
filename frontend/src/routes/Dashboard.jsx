import { useState,useEffect } from "react";
import { AppBar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios";

export default function Dashboard() {
    const [users,setUsers] = useState([]);
    const [filter,setFilter] = useState("");
    const [balance,setBalance] = useState(0);

    useEffect(() => {
        const dataFetcher = async () => {
            const response = await axios.get("http://localhost:3000/api/v1/user/bulk/?filter="+filter,{
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUsers(response.data.users);
        }
        dataFetcher();
    },[filter])

    useEffect(()=>{
        const fetchData= async () => {
            const response = await axios.get("http://localhost:3000/api/v1/accounts/balance",{
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            setBalance(response.data.balance);
        }
        fetchData();
    },[])
    return <div className="flex flex-col h-screen justify-center items-center">
        <AppBar label="username"></AppBar>
        <Balance balance={balance}></Balance>
        <Users users={users} onChange={e => {setFilter(e.target.value)}}></Users>
    </div>
}