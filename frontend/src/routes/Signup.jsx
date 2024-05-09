import {Heading} from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottmWarning";
import axios from "axios";
import { useState } from "react";

export default function Signup(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleClick(){
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            firstName,
            lastName,
            username,
            password 
        });
        localStorage.setItem("token",response.data.token);
    }
    
    return <div className="bg-slate-400 flex h-screen justify-center items-center">
        <div class="rounded-md bg-white flex flex-col justify-center h-max items-center">
            <Heading label="Sign Up"></Heading>
            <SubHeading label="Enter your detailis to sign up"></SubHeading>
            <InputBox label="First Name" type="text" placeholder="John" onChange={(e) => {setFirstName(e.target.value)}}></InputBox>
            <InputBox label="Last  Name" type="text" placeholder="Doe" onChange={(e) => {setLastName(e.target.value)}}></InputBox>
            <InputBox label="Username" type="text" placeholder="username" onChange={(e) => {setUsername(e.target.value)}}></InputBox>
            <InputBox label="Password" type="password" placeholder="" onChange={(e) => {setPassword(e.target.value)}}></InputBox>
            <Button label="Sign Up" onClick={handleClick}></Button>
            <BottomWarning label="already have an account?" label1="sign in" to="/signin"></BottomWarning>
        </div>
    </div>
}