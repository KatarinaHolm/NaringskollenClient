import InputField from "../atoms/input";
import { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router";

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleLogin(e){
        
        e.preventDefault();        
        await login(email, password);
        navigate("/admin");
    }

    return(
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Logga in</legend>
            <form onSubmit={handleLogin}>
                <InputField type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
                <InputField type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />                         
                <button type="submit" className="btn btn-neutral mt-4">Logga in</button>
            </form>
        </fieldset>
    )
}   