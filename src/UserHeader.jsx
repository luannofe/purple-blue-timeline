import { getDoc, doc as DOXs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import FireBase from "./firebase";


const isImgLink = (url) => {
    if (typeof url !== 'string') {
        return false;
    }
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) !== null);
}


export default function PostHeader({data}) {

    const [user, setUser] = useState({
        profileIMGURL: "./placeholder.png"
    })

    let post_date = "Postado em " + new Date(data.data().date).toLocaleDateString() + " as " + new Date(data.data().date).toLocaleTimeString()

    async function getPostUser() {

        let doc = await getDoc(DOXs(FireBase.db, 'users', data.data().email)) 
        let imgurl;

        try {
            imgurl = doc.data().profileIMGURL
        } catch (error) {
            return;
        }
        

        
        if (!isImgLink(imgurl)) {
            return;
        }

        setUser(doc.data())

    }

    useEffect(() => {
        getPostUser()
    }, [])

    let username = data.data().username

    return (

        <>
            <div className="UserHeader">
                <img src={user.profileIMGURL}/>
                <div>
                    <span className="name">{username}</span>
                    <span>{post_date}</span>
                </div>
            </div>
        </>

    )
    
}

 function UserHeader({data, setProfpic}) {

    const [user, setUser] = useState({
        profileIMGURL: "./placeholder.png"
    })

    async function getPostUser() {

        let doc = await getDoc(DOXs(FireBase.db, 'users', data.email)) 
        let imgurl;

        try {
            imgurl = doc.data().profileIMGURL
        } catch (error) {
            return;
        }
        
        
        if (!isImgLink(imgurl)) {
            return;
        }

        setUser(doc.data())
        

    }

    useEffect(() => {
        getPostUser()
        setProfpic(user.profileIMGURL)
    }, [])

    return (
    <div className="UserHeader">
        <img src={user.profileIMGURL}/>
        <div>
            <span className="name">{data.displayName}</span>
            <span>Público</span>
        </div>
    </div>       

    )

 }

 export {UserHeader}