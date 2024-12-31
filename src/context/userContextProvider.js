import React, { useState } from "react";
import UserContext from "./userContext";

export const UserContextProvider = ({children}) =>{
    const [user,setuser]=useState("");
    return<UserContext.Provider value={{user,setuser}}>
        {children}
    </UserContext.Provider> 
}