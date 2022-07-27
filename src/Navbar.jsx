import React, { useContext, useState } from "react";
import { userContext } from "./App";
import FireBase from "./firebase";
import ProfileManager from "./ProfileManager";



export default function Navbar() {

    const user = useContext(userContext)
    const [showProfile, setShowProfile] = useState(false)

    function btHandleLogout(e) {

        FireBase.auth.signOut()
    }

    function btHandleProfile(e) {

        setShowProfile(!showProfile)
    }


    return(

        <nav className="nav">
            <span>Purple Blue Timeline</span>
            <div className="btns">
                <button onClick={btHandleProfile}>Profile</button>
                <button onClick={btHandleLogout}>Logout</button>
            </div>
            {showProfile && 

            <>
                <ProfileManager props = {setShowProfile}/>
            </>       
            
            }
        </nav>

    )
}