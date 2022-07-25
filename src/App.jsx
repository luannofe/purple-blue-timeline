import React, { useContext, useState } from "react";
import { createContext } from "react";
import { Helmet } from "react-helmet";
import LoginPage from "./LoginPage";
import Mainpage from "./MainPage";
export const userContext = createContext()

export default function App() {

    const [connectedUser,setconnectedUser] = useState()
    
    if (connectedUser) {
        return (
            <>
                <Helmet>
                    <title>Purple Blue Timeline</title>
                </Helmet>
                <userContext.Provider value={{connectedUser, setconnectedUser}}>
                    <Mainpage/> 
                </userContext.Provider>
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>PBT - Faça login</title>
            </Helmet>
            <userContext.Provider value={{connectedUser, setconnectedUser}}>
                <LoginPage/>
            </userContext.Provider>     
        </>        
        
    )
}

