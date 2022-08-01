import { doc, setDoc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import FireBase from "./firebase";

const db = FireBase.db

export default function ProfileManager({props}) {
    const [profpic, setProfpic] = useState('./placeholder.png')

    let nicktext
    let imgtext

    useEffect(() => {

        (async function () {
            let docx = await getDoc(doc(db, 'users', FireBase.auth.currentUser.email))
            setProfpic(docx.data().profileIMGURL)
        })()

    }, [])

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
                        <img src={profpic} alt="" />
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