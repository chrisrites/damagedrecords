import mongoose from 'mongoose'
const connection = {}

async function connectDb(){
    // Check n see if we're already connected
    if(connection.isConnected){
        // Use existing connection
        return;
    }

    // Use new db connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    // Connect Mongo Atlas DB to serverless application
    connection.isConnected = db.connections[0].readyState;
}

export default connectDb