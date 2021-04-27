import mongoose from 'mongoose'

const { String } = mongoose.Schema.Types

const ArtistSchema  = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        unique: true,
        required: true
    }
})

// Since we're using serverless configuration, we need to check to make sure the model has not already been generated
export default mongoose.models.Artist || mongoose.model('Artist', ArtistSchema)