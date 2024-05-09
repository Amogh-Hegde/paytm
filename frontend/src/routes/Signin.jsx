import { useState } from "react";
import { BottomWarning } from "../components/BottmWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    async function handleClick(){
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            username,
            password 
        });
        if(response.status === 200){
            navigate("/");
            localStorage.setItem("token",response.data.token);
        }else{
            alert("wrong inputs/username already taken")
        }
    }

    return <div className="bg-slate-400 h-screen flex flex-col justify-center items-center">
        <div className="rounded-md flex flex-col justify-center items-center h-max bg-white">
            <Heading label="Sign In"></Heading>
            <SubHeading label="enter your details to sign in"></SubHeading>
            <InputBox label="Username" type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}}></InputBox>
            <InputBox label="Password" type="password" placeholder="" onChange={(e) => {setPassword(e.target.value)}}></InputBox>
            <Button label="Sign in" onClick={handleClick}></Button>
            <BottomWarning label="don't have an account?" label1="sign up" to="/signup"></BottomWarning>
        </div>
    </div>
}

