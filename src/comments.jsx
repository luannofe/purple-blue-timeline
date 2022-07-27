import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import UserHeader from "./UserHeader";
import FireBase from "./firebase";
import PostHeader from "./UserHeader";

const db = FireBase.db

export default function Comment({post_id}) { 



    const [comments, setComments] = useState([])

    useEffect(() => {
        const loadComments = async () => {

            let comm = await getDocs(collection(db,'posts', post_id, 'comments'))
            comm.forEach( comm => {

                setComments(comments => [
                    ...comments, comm
                ])

            })
        }
        loadComments()
    },[])

    return (
    <div className="post_comments">
        {comments.map( comment => {
            return (
                <div className="comment" key={comment.id}>
                    <PostHeader data={comment}/>
                    <div className="post_body">
                        <span>{comment.data().body}</span>
                    </div>
                    <div className = "interact_buttons_post">
                        <button>Curtir</button>
                    </div>
                </div>
            )
        })}
    </div>
    )
}