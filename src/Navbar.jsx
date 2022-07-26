import React, { useContext } from "react";
import { userContext } from "./App";
import FireBase from "./firebase";



export default function Navbar() {

    const user = useContext(userContext)

    function btHandleLogout(e) {
        user.setconnectedUser(undefined)
        FireBase.auth.signOut()
        console.log(FireBase.auth.currentUser)
    }


    return(
        <nav className="nav">
            <span>Purple Blue Timeline</span>
            <div>
                <button>Profile</button>
                <button onClick={btHandleLogout}>Logout</button>
            </div>
        </nav>

    )
}