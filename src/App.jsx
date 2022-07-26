import { browserLocalPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Helmet } from "react-helmet";
import FireBase from "./firebase";
import LoginPage from "./LoginPage";
import Mainpage from "./MainPage";

export const userContext = createContext()

export default function App() {

    const [connectedUser,setconnectedUser] = useState()
    const [loading, setLoading] = useState(true)

    FireBase.auth.onAuthStateChanged( (user) => {
        setconnectedUser(user)
        setLoading(false)
    })




    return (

            <>
                {!loading && (
                    <>
                    {connectedUser && 
                        (
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
                    {!connectedUser &&
                        ( <>
                            <Helmet>
                                <title>PBT - Faça login</title>
                            </Helmet>
                            <userContext.Provider value={{connectedUser, setconnectedUser}}>
                                <LoginPage/>
                            </userContext.Provider>   
                        </>)
                    }
                    </>
                )}  
            </>
        
    )
}

