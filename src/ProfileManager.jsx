import React from "react";
import FireBase from "./firebase";



export default function ProfileManager() {
    
    return (
        <div className="Profile_manager">
            <img src="./RAFA.png" alt="" />
            <span>{FireBase.auth.currentUser.displayName}</span>
            <button>Sair</button>
        </div>
    )
}