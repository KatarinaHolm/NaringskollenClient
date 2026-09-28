import InputLogin from "../atoms/inputLogin";
import { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router";
import ButtonSecondary from "../atoms/buttonSecondary";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e){

        e.preventDefault();        
        await login(email, password);
        // Give error message if login failed. 
        navigate("/admin");
    };

    return(
        <fieldset className="fieldset bg-base-200/90  border-base-300 rounded-box max-w-lg border p-4 my-8">
            <h2 className="card-title">Logga in</h2>
            <form onSubmit={handleLogin}>
                <InputLogin type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                <InputLogin type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />   
                <ButtonSecondary text="Logga in" type="submit" />                
            </form>
        </fieldset>
    )
}   