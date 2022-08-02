import React, { useContext, useEffect, useState } from "react";
import Comment from "./comments";
import { userContext } from "./App";
import MakeAPost from "./MakeAPost";
import FireBase from "./firebase";
import { addDoc, getDocs, collection } from "./firebase";
import Loading from "./Loading";
import { doc, doc as XX, getDoc, setDoc } from "firebase/firestore";
import { PostOptions } from "./PostOptions";
import PostHeader from "./UserHeader";

const db = FireBase.db


export default function Posts() {

    const [newpost, setNewpost] = useState(undefined)
    const [posts,setPosts] = useState([])
    const user = useContext(userContext).connectedUser
    const[ isLoading, setLoading ]= useState({state: true, visibility: 'hidden'})
    const [profpic, setProfpic] = useState('./placeholder.png')
    const [newcomment, setNewcomment] = useState()

    function sortPosts() {
        posts.sort(
            function (a,b) {
                if (a.data().date > b.data().date) {
                    return -1
                } else {return 1}
            }
        )
    }

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


    
    
    
    //use effect pra criação do component
    useEffect(() => {
        
        //seta loading
        setTimeout((() => {
            setLoading({state: false, visibility: 'visible'})
        }), 3500)


        //carrega a profpic
        async function loadprofpic() {
            let doc = await getDoc(XX(db, 'users', FireBase.auth.currentUser.email))
            setProfpic(doc.data().profileIMGURL)
        }
        loadprofpic()

        //carrega posta
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
        sortPosts()
    }, [])  

    //use effect pra quando tiverem posts
    useEffect(() => {
        sortPosts()
    }, [posts])
    
    const postCommentH = post => e => {
        let text = e.target.innerText
        if (e.key === 'Enter') {
            e.preventDefault()
            e.target.innerText = ""


            
            addDoc(collection(db, 'posts', post.id, 'comments'), {
                body: text,
                email: FireBase.auth.currentUser.email,
                username: user.displayName,
                likes: [],
                date: Date.now()
            }).then(
                (res) => {
                    setNewcomment({res: res, post_id: post.id})
                }
            )
        }
    
    }

    

    return (
        <div className="maincontainer" id="maincontainer">
            <MakeAPost props = {{newpost, setNewpost, setProfpic}}/>
            <div className="posts_container">
                {isLoading.state && <Loading/>}
                {posts.map(post => {
                    return (
                        <React.Fragment key={post.id}>
                            <div className="post" style={{visibility: isLoading.visibility}} >
                                <div className="PostHeader">
                                    <PostHeader data={post}/>
                                    <PostOptions post={post} funcs={{posts,setPosts}} />
                                </div>
                                <div className="post_body">
                                    <span>{post.data().body}</span>
                                </div>
                                <InteractButtons post={post}/>
                                <div className="create_comment">
                                    <form>                 
                                        <img src={profpic}/>
                                        <div onKeyDown={postCommentH(post)} name="tocomment_body" contentEditable= "true" suppressContentEditableWarning={true} onClick={((e)=>{e.target.innerText = ''})} onBlur={((e)=>{e.target.innerText = 'Faça um comentário...'})}>
                                            Faça um comentário...
                                        </div>
                                    </form>
                                </div>
                                <Comment post_id = {post.id} cmt = {{ newcomment, setNewcomment}} key={(post.id + 1)}/>
                            </div>
                        </React.Fragment>
                    )
                }        )         }
            </div>
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
           
            if (alreadyLiked) {

                let newarr = array.filter((ind) => { return ind != FireBase.auth.currentUser.email})

                await setDoc(doc(db, 'posts', post.id), {
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
            await setDoc(doc(db, 'posts', post.id), {
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
  