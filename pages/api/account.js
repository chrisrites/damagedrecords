import User from '../../models/User'
import jwt from 'jsonwebtoken'
import connectDb from '../../utils/connectDb'

connectDb()

export default async (req, res) => {
    switch(req.method) {
        case "GET":
            await handleGetRequest(req, res)
            break
        case "PUT":
            await handlePutRequest(req, res)
            break
        default:
            res.status(405).send(`Method ${req.method} not allowed`)
            break
    }
}

async function handleGetRequest (req, res) {
    // Below conditional is an alternate way of the statement: !req.headers.authorization
    if(!("authorization" in req.headers)){
        // 401, not permitted
        return res.status(401).send('No authorization token')
    }

    try {
        const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: userId })
        if(user){
            res.status(200).json(user)
        } else {
            res.status(404).send('User not found')
        }
    } catch (error) {
        // Forbidden acction, token is not valid
        res.status(403).send("Invalid token")
    }
}

async function handlePutRequest(req, res){
    const { _id, role } = req.body
    await User.findOneAndUpdate(
        { _id },
        { role: role }
    )
    res.status(203).send('User updated')
}