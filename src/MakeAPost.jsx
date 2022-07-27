import { userContext } from "./App";
import React, { useContext, useEffect, useState } from "react";
import FireBase from "./firebase";
import { addDoc, getDocs, collection } from "./firebase";
import {UserHeader} from "./UserHeader";



const db = FireBase.db


export default function MakeAPost({props}) {
    
     
    const user = useContext(userContext).connectedUser


    function MakePostH(e)  {

        let text = e.target.innerText
        
        if (e.key === 'Enter') {
            e.preventDefault()
            e.target.innerText = ""

            addDoc(collection(db, 'posts'), {
                body: text,
                username: user.displayName,
                email: user.email,
                likes: 0,
                date: Date.now()
            }).then(res => {
                props.setNewpost(res.id)
            })
        }
    }


    return (

        <div className="MakeAPost_container">
            <UserHeader data={user} setProfpic={props.setProfpic}/>
            <div suppressContentEditableWarning={true} contentEditable='true' className="t" onKeyDown={MakePostH} onClick={((e)=>{e.target.innerText = ''})} onBlur={((e)=>{e.target.innerText = 'No que está pensando?'})}>
                No que está pensando?
            </div>

        </div>

    )

}