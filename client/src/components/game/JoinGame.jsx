import React, { useState } from 'react'
import Navbar from '../Navbar'
import { useChatContext } from 'stream-chat-react'
import { Channel } from 'stream-chat-react/dist/components/Channel/Channel';
import Game from './Game';
const JoinGame = ({logOut}) => {
    
    const [rivalUsername, setRivalUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null)


    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: rivalUsername } })

        if (response.users.length === 0) {
            setErrorMessage("User not found");
            alert("User not found")
            return
        }
        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id],
        });

        await newChannel.watch();
        setChannel(newChannel);

    }


    return (
        <>
            {
                channel ? (
          <Channel channel={channel} >
                    <Game channel={channel} />
          </Channel>
          
                ) :
                    (
                        <>
                            <Navbar />
                            <section class="register-main-container container section section__height vih" id="home">
                                <div class="register-head">
                                    <h6>Start a new game</h6>
                                    <h4>Whom do you want to play with?</h4>
                                </div>
                                <div class="joininputs inputs">
                                        <div class="input-content">
                                            <label for="">Opponent's username</label>
                                            <input type="text" class='hover_shadow' placeholder='Enter username of your rival' onChange={(event)=>{setRivalUsername(event.target.value)}} />
                                        </div>
                                        {errorMessage ? (
                                <div class="error-message">{errorMessage}</div>
                            ) : null}
                                        <button class="avezbtn avezMt_2 registerbtn skin hover_shadow" onClick={createChannel} >Start Game</button>
                                        <button class="avezbtn warning-avez" onClick={logOut} >Logout</button>
                                        <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
                                        <button class="avezbtn hidden avezMt_2 registerbtn skin hover_shadow">Register</button>
                                </div>
                            </section>
                        </>
                    )
            }



        </>
    )
}

export default JoinGame