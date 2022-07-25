import React, { useContext, useState } from "react";
import { createContext } from "react";
import LoginPage from "./LoginPage";
import Mainpage from "./MainPage";

export const userContext = createContext()

export default function App() {

    console.log('oi')
    console.log(process.env)
    const [connectedUser,setconnectedUser] = useState()
    
    if (connectedUser) {
        console.log(connectedUser)
        return (
            <userContext.Provider value={{connectedUser, setconnectedUser}}>
                <Mainpage/> 
            </userContext.Provider>
        )
    }

    return (
        
        <userContext.Provider value={{connectedUser, setconnectedUser}}>
            <LoginPage/>
        </userContext.Provider>             
        
    )
}

