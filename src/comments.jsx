import React, { useEffect, useState } from "react";
import { collection, doc as PIP, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import UserHeader from "./UserHeader";
import FireBase from "./firebase";
import PostHeader from "./UserHeader";


const db = FireBase.db

export default function Comment({post_id, cmt}) { 

    console.log(cmt)

    useEffect(() => {
        if (cmt.newcomment !== undefined) {
            const addComment = async () => {
                let ref = PIP(db, 'posts', post_id, 'comments', cmt.newcomment)
                let doc = await getDoc(ref)
                cmt.setComments(comments => [
                    doc, ...comments
                ])
            }
            addComment()
        }
    }, [cmt.newcomment])

    useEffect(() => {
        const loadComments = async () => {

            let comm = await getDocs(collection(db,'posts', post_id, 'comments'))
            comm.forEach( comm => {

                cmt.setComments(comments => [
                    ...comments, comm
                ])

            })
        }
        loadComments()
    },[])

    return (
    <div className="post_comments">
        {cmt.comments.map( comment => {
            return (
                <div className="comment" key={comment.id}>
                    <PostHeader data={comment}/>
                    <div className="post_body">
                        <span>{comment.data().body}</span>
                    </div>
                    <InteractButtons post = {comment}/>
                </div>
            )
        })}
    </div>
    )
}


function InteractButtons({post}) {

    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState('Curtir')

    async function search(array) {

        for (let user in array) {

            if (array[user] === FireBase.auth.currentUser.email) {
                return true
            }
        }
    }


     const handleLikeButton = post => e => {

        (async function() {



            let array = likes
            let alreadyLiked = await search(array)
            console.log(post.ref)
            
            if (alreadyLiked) {

                let newarr = array.filter((ind) => { return ind != FireBase.auth.currentUser.email})

                await setDoc(PIP(db, post.ref.path), {
                    likes: newarr
                }, {merge: true})
                .then(
                    () => {
                        setLiked('Curtir')
                        setLikes(newarr)
                    }
                )
                return;
            }

            array.push(FireBase.auth.currentUser.email)
            await setDoc(PIP(db, post.ref.path), {
                likes: array
            }, {merge: true}).then(
                () => {

                    setLiked('Curtiu')
                    setLikes(array)
                }
            )

        })()

    }

    useEffect(() => {

        (async function() {

            let array = post.data().likes  
            let alrLiked = await search(array)
            setLikes(array)

            if (alrLiked) {
                setLiked('Curtiu')
            }
        })()

    }, [])



    return (
        <div className="interact_buttons_post">
            <button onMouseDown={handleLikeButton(post)}>{liked}</button>
            <span>{likes.length}</span>
        </div>
    )

}