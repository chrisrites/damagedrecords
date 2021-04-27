import mongoose from 'mongoose'

const { String, Date } = mongoose.Schema.Types

const NewsItemSchema  = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    links: [
        {
            link: {
                type: String
            },
            linkName: {
                type: String
            }
        }
    ],
    artists: [
        {
            type: String
        }
    ]
})

// Since we're using serverless configuration, we need to check to make sure the model has not already been generated
export default mongoose.models.NewsItem || mongoose.model('NewsItem', NewsItemSchema)