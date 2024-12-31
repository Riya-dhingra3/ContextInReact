import React,{useContext} from "react";
import UserContext from "./context/userContext";

function Oone({query}){
    const usercontext=useContext(UserContext);
    const {user,setuser} = usercontext;
    const handlePress = () =>{
        setuser(query);
    }
    return(
    <div>
        <p>Hey I am a new file</p>
        <button onClick={handlePress}>Set USer</button>
        <p>{user}</p>
    </div>
    )
}

export default Oone;