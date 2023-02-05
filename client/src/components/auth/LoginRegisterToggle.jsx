import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
const LoginRegisterToggle = ({setIsAuth}) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div class="vheight" >
      
      {showLogin ? <Login setIsAuth={setIsAuth} /> : <Register setIsAuth={setIsAuth} />}
      <button class="toggler" onClick={() => setShowLogin(!showLogin)}>
        <h3> {showLogin ? "Don't have an account Register" : "Already have an account , Login"} </h3> 
      </button>
    </div>
  );
};

export default LoginRegisterToggle;