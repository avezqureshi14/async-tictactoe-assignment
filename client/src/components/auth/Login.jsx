import React, { useState } from 'react'
import Navbar from '../Navbar'
import Axios from "axios"
import Cookies from "universal-cookie"
const Login = ({setIsAuth}) => {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const cookies = new Cookies()
    const login = () => {
      Axios.post("http://localhost:8080/login", {
      username,
      password,
    }).then((res)=>{
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
      <section class="register-main-container container section section__height vih" id="home">
        <div class="register-head">
          <h6>Login</h6>
          <h4>Please Enter your Details</h4>
        </div>
        <div class="inputs inputslog">
          <form action="">
            <div class="input-content">
              <label for="">Username</label>
              <input type="text" class="hover_shadow" onChange={(event) => {
                setUsername(event.target.value);
              }} placeholder="Type your username here" />
            </div>
            <div class="input-content">
              <label for="">Password</label>
              <input type="text" class="hover_shadow" onChange={(event) => {
                setPassword(event.target.value);
              }} placeholder="Type your password here" />
            </div>
            <button class="avezbtn avezMt_2 registerbtn skin hover_shadow" onClick={login}  >Login</button>
            <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
            <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default Login