import { useState } from "react"
import { Amount } from "../components/Amount"
import { Heading } from "../components/Heading"
import { To } from "../components/To"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Send(){ 
    const [amount,setAmount] = useState(0);
    const {key} = useParams();
    const {username} = useParams();

    async function handleClick(){
        const response = axios.post("http://localhost:3000/api/v1/accounts/transfer",{
            to : key,
            amount
        },{
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
        });
        if(response.status === 200){
            setAmount(0);
            alert("transfer successful!");
        }
    }

    return <div className="flex flex-col justify-center items-center h-screen bg-slate-100">
        <div className="flex flex-col items-center border w-1/3 rounded-lg shadow-lg bg-white p-3">
            <Heading label="Send Money"></Heading>
            <To to={username}></To>
            <Amount onChange={e =>{setAmount(e.target.value)}}></Amount>
            <button onClick={handleClick} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                  Initiate Transfer
            </button>
        </div>
    </div>
}