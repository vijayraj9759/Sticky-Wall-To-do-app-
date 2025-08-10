import mongoose from "mongoose"

const connectdb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successful")
    }catch{
        console.log("Connection unsuccessful")
    }
}

export default connectdb