import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { v4 as uuidv4 } from "uuid"
import { StreamChat } from "stream-chat"
import bcrypt from "bcrypt"
const app = express()
dotenv.config({path:'./config.env'})

app.use(cors())
app.use(express.json());
//This are the API keys which are kept for the purpose of eveluation of code
// const api_key = "59aufd645adt"
// const api_secret = "pjubpa47dj9mgjk5hzv7zfkcp6q7ngsj9ekm27djur75pm72gunnqefgsjgvfwht"
const api_key = process.env.API_KEY
const api_secret = process.env.API_SECRET_KEY
const serverClient = StreamChat.getInstance(api_key, api_secret)

app.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password } = req.body
        const userId = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = serverClient.createToken(userId);
        res.json({ token, userId, firstName, lastName, username, hashedPassword })
    } catch (error) {
        res.json(error)
    }

})

app.post("/login", async (req, res) => {
    try {


        const { username, password } = req.body
        const { users } = await serverClient.queryUsers({ name: username });
        if (users.length === 0) {
            return res.json({ message: "User not found" })
        }
        const token = serverClient.createToken(users[0].id);
        const passwordMatch = await bcrypt.compare(password, users[0].hashedPassword);

        if (passwordMatch) {
            res.json({
                token,
                firstName: users[0].firstName,
                lastName: users[0].lastName,
                username,
                userId: users[0].id,
            })
        }

    } catch (error) {
        res.json(error)
    }
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT} ` )
})