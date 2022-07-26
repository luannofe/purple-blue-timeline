import React, { useState } from "react";
import FireBase from "./firebase";
import Posts from "./loadPosts";
import Navbar from "./Navbar";
import ProfileManager from "./ProfileManager";

const auth = FireBase.auth

export default function Mainpage() {

    const [firstTime,setFirstTime] = useState(false)

    if (!auth.currentUser.displayName) {
        
        return <FirstTimer props = {setFirstTime}/>
    }

    return (
        <>  
            <Navbar/>
            <Posts/>
        </>
    )
}

function FirstTimer({props}) {

    function usernameInputH(e) {
        let text = e.target.innerText
        if (e.key === 'Enter') {
            e.preventDefault()
            FireBase.updateProfile(auth.currentUser, {
                displayName: text
            }).then(asd => {
                props(true)
            })
        }
    }

    function usernameInputOnFocus(e) {
        e.target.innerText = ""
    }

    return (
        <div className="welcome_div">
           <span>Seja bem vindo...</span>
            <div className="username_input_div" contentEditable="true" placeholder="asdasd" onKeyDown={usernameInputH} onFocus={usernameInputOnFocus}>Digite seu nome</div>
        </div>
    )
}