import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LoginRegisterToggle from './components/auth/LoginRegisterToggle';
import { StreamChat } from 'stream-chat'
import Cookies from "universal-cookie"
import { Chat } from "stream-chat-react"
import { useState } from 'react';
import JoinGame from './components/game/JoinGame';
function App() {
  const api_key = "59aufd645adt"
  const cookies = new Cookies();
  const token = cookies.get("token")
  const client = StreamChat.getInstance(api_key)
  const [isAuth, setIsAuth] = useState(false);
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false)
  }
  if (token) {
    client.connectUser({
      id: cookies.get("userId"),
      name: cookies.get("username"),
      firstName: cookies.get("firstName"),
      lastName: cookies.get("lastName"),
      hashedPassword: cookies.get("hashedPassword")
    },
      token
    ).then((user) => {
      console.log(user);
      setIsAuth(true)
    })
  }
  return (
    <>
    <div class="mobHidd">
    As Per Layout Rule of Assigment this Application Scope is restricted to Mobile Devices only, If you are using Desktop, please using Developer Tools Switch to Mobile View
    </div>
    
    <div class="Application">
      {isAuth ? (
        <Chat client={client} >
          <JoinGame logOut={logOut} />
          
        </Chat>
      ) : (
        <LoginRegisterToggle setIsAuth={setIsAuth} />
      )}
      </div>
    </>
  );
}

export default App;
