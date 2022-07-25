import React, { createContext, useContext, useEffect, useState } from "react";
import { userContext } from "./App";
import FireBase from "./firebase";


const db = FireBase.db
const auth = FireBase.auth
auth.updateCurrentUser()


export default function LoginForm() {

    const [formdata, setFormdata] = useState() 

    const user = useContext(userContext)


    useEffect(() => {

        if (!formdata) return;

        FireBase.signup(formdata.email, formdata.password)
            .then((res) => {
                user.setconnectedUser(FireBase.auth.currentUser)
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    FireBase.login(formdata.email, formdata.password)
                    .then((res) => {
                        user.setconnectedUser(FireBase.auth.currentUser)
                    })
                }
            })

    }, [formdata])

   async function formHandler(e) {
        e.preventDefault();


        await setFormdata({
            'email':  e.target.email.value,
            'password': e.target.password.value
        })
        
    }

    return (
        <div className="login_page">
            <span className="title">Entre com seus dados:</span>
            <form onSubmit={formHandler}>
                <label>
                    <span>Email:</span>
                    <input type="text" name="email" required/>
                </label>
                
                <label>
                    <span>Senha:</span>
                    <input type="password" name="password" required/>
                </label>
                Caso não tenha uma conta, será criada ao prosseguir.
                <button type="submit"></button>
            </form>
        </div>
    ) 
   
}