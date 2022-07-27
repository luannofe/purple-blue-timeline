import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import FireBase from "./firebase";

export function PostOptions({post, funcs}) {

    const [interacted, setInteracted] = useState(false);

     
    function handleOptClick(e) {
        setInteracted(!interacted)
    }

    async function handleOptDeletePub(e) {
        await deleteDoc(doc(FireBase.db, 'posts', post.id))
        setInteracted(!interacted)
        let newposts = funcs.posts.filter((item) => {
           return item.id !== post.id
        })
        funcs.setPosts(newposts)

    }


    return (
        <>
            <div className="PostOptions-parent">
                <button onClick={handleOptClick} className="optButton"></button>
                {interacted && 
                    <div className="PostOptions">
                        <div className="losang"></div>
                        <nav>
                            {post.data().email == FireBase.auth.currentUser.email && 
                                <div onClick={handleOptDeletePub} className="option">
                                    <span className="opt_title">Apagar publicação</span>
                                </div>
                            }
                        </nav>
                    </div>
                }
            </div>
        </>
    );
}

