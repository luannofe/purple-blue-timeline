import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import FireBase from "./firebase";



export default function ProfileManager({props}) {
    let nicktext
    let imgtext

    const [profileUpdated, setProfileUpdated] = useState(false)

    function handleBtClose(e) {
        props()
    }

    function handleNickname(e) {
        nicktext = e.target.innerText
    }

    function handleUpdate(e) {
        FireBase.updateProfile(FireBase.auth.currentUser, {
            displayName: nicktext,
        })

        setDoc(doc(FireBase.db, 'users', FireBase.auth.currentUser.email), {
            profileIMGURL: imgtext
        }, {merge: true})
        setProfileUpdated(true)
        setTimeout(() => {window.location.reload()}, 1000)
    }

    function handleIMGurl(e) {
        imgtext = e.target.innerText
        console.log(imgtext)
    }

    return (
        <div className="Profile_manager">
            <div className="inner">
                {!profileUpdated &&
                <>
                    <div className="head">
                        <img src="./RAFA.png" alt="" />
                        <div className="inputs">
                            <div className="ncktext" contentEditable onKeyUp={handleNickname}>{FireBase.auth.currentUser.displayName}</div>
                            <div className="ncktext" contentEditable onKeyUp={handleIMGurl}>Img url</div>
                        </div>
                    </div>
                    <div className="bottom">
                        <button onClick={handleBtClose}>Sair</button>
                        <button onClick={handleUpdate}>Atualizar</button>
                    </div>
                </>
                }
                {profileUpdated &&
                <>
                    <div className="profile_updated">
                        Perfil atualizado!
                    </div>
                </>                
                }
            </div>
        </div>
    )
}