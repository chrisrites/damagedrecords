import mongoose from 'mongoose'

const { String } = mongoose.SchemaTypes

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // Select determines when we get the user data, whether the password is included or not.  select: false ensures when we send the user data to the client, the password will not be included
        select: false
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ["user", "admin", "root"]
    }
}, {
    timestamps: true
})

export default mongoose.models.User || mongoose.model("User", UserSchema)