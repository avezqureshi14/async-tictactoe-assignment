import React, { useState } from 'react'
import Navbar from '../Navbar'
import Axios from "axios"
import Cookies from "universal-cookie"
const Register = ({setIsAuth}) => {
    const cookies = new Cookies()
    const [user, setUser] = useState(null);
    const signUp = () => {
        Axios.post("http://localhost:8080/signup",user).then((res)=>{
            const {token,userId,firstName,lastName,username,hashedPassword} = res.data;

            cookies.set("token",token);
            cookies.set("userId",userId);
            cookies.set("username",username);
            cookies.set("firstName",firstName);
            cookies.set("lastName",lastName);
            cookies.set("hashedPassword",hashedPassword);
            setIsAuth(true)
        })
    }
    return (
        <>
            <Navbar />
            <section class="register-main-container container section section__height" id="home">
                <div class="register-head">
                    <h6>Create an account</h6>
                    <h4>Let's get to know you better!</h4>
                </div>
                <div class="inputs reginputs">
                    <form action="">
                        <div class="input-content">
                            <label for="">Your Name</label>
                            <input type="text" class="hover_shadow" onChange={(event)=>{
                                setUser({...user, firstName:event.target.value});
                            }} placeholder="Type your name here" />
                        </div>
                  
                        <div class="input-content">
                            <label for="">Email</label>
                            <input type="text" class="hover_shadow"  onChange={(event)=>{
                                setUser({...user, lastName:event.target.value});
                            }} placeholder="Type your name here" />
                        </div>
                        <div class="input-content">
                            <label for="">Username</label>
                            <input type="text" class="hover_shadow"  onChange={(event)=>{
                                setUser({...user, username:event.target.value});
                            }}  placeholder="Type your username here" />
                        </div>
                        <div class="input-content">
                            <label for="">Password</label>
                            <input type="text" class="hover_shadow"  onChange={(event)=>{
                                setUser({...user, password:event.target.value});
                            }} placeholder="Type your name here" />
                        </div>
                        <button class="avezbtn avezMt_2 registerbtn skin hover_shadow"  onClick={signUp}  >Register</button>
                        <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
                        <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register