import React, { useContext, useEffect, useState } from "react";
import Comment from "./comments";
import { userContext } from "./App";
import MakeAPost from "./MakeAPost";
import FireBase from "./firebase";
import { addDoc, getDocs, collection } from "./firebase";
import UserHeader from "./UserHeader";
import Loading from "./Loading";
import { doc as XX, getDoc } from "firebase/firestore";
import { PostOptions } from "./PostOptions";

const db = FireBase.db





export default function Posts() {

    const [newpost, setNewpost] = useState()
    const [posts,setPosts] = useState([])
    const user = useContext(userContext).connectedUser
    const[ isLoading, setLoading ]= useState({state: true, visibility: 'hidden'})

  

    //use effect pra quando um post for feito
    useEffect(() => {
        if (newpost !== undefined) {

            const addPost = async () => {
                let ref = XX(db, 'posts', newpost)
                let doc = await getDoc(ref)
                setPosts(posts => [
                    doc, ...posts
                ])
            }
            addPost()
        }
        
    }, [newpost])


    //use effect pra quando tiverem posts
    useEffect(() => {
        posts.sort(
            function (a,b) {
                if (a.data().date > b.data().date) {
                    return 1
                } else {return -1}
            }
        )
    }, [posts])



    //use effect pra criação do component
    useEffect(() => {
       
        setTimeout((() => {
            setLoading({state: false, visibility: 'visible'})
        }), 1500)
        const loadPosts = async () => {
            setPosts([])
            const pip = await getDocs(collection(db,'posts'))
            pip.forEach(pip => {
                setPosts(posts => [
                    ...posts, pip
                ])
            })

        }
        loadPosts()
    }, [])  

    const postCommentH = post => e => {
        let text = e.target.innerText
        if (e.key === 'Enter') {
            e.target.innerText = ""

            
            addDoc(collection(db, 'posts', post.id, 'comments'), {
                body: text,
                username: user.email,
                likes: 0,
                date: '03940394'
            })
        }
    
    }


    return (
        <div className="maincontainer" id="maincontainer">
            <MakeAPost props = {{newpost, setNewpost}}/>
            <div className="posts_container">
                {isLoading.state && <Loading/>}
                {posts.map(post => {
                    return (
                        <>
                            <div className="post" style={{visibility: isLoading.visibility}} key={post.id}>
                                <div className="PostHeader">
                                    <UserHeader data={post}/>
                                    <PostOptions post={post} funcs={{posts,setPosts}} />
                                </div>
                                <div className="post_body">
                                    <span>{post.data().body}</span>
                                </div>
                                <div className="interact_buttons_post">
                                    <button>Curtir</button>
                                    <button>Comentar</button>
                                </div>
                                <div className="create_comment">
                                    <form>                 
                                        <img src="./RAFA.png"/>
                                        <div onKeyUp={postCommentH(post)} name="tocomment_body" contentEditable= "true" suppressContentEditableWarning={true} placeholder="Escreva um comentário...">
                                            Faça um comentário...
                                        </div>
                                    </form>
                                </div>
                                <Comment post_id = {post.id}/>
                            </div>
                        </>
                    )
                }        )         }
            </div>
        </div>
    )
}

