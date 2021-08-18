import mongoose from 'mongoose'

const { String, Date } = mongoose.Schema.Types

const EventSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: [
        {
            type: String
        }
    ],
    description: {
        type: String
    },
    image: {
        type: String
    },
    map: {
        type: String
    },
    price: {
        type: String
    },
    age: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    doors: {
        type: String,
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
            name: {
                type: String
            },
            path: {
                type: String
            }
        }
    ]
})

// Since we're using serverless configuration, we need to check to make sure the model has not already been generated
export default mongoose.models.Event || mongoose.model('Event', EventSchema)