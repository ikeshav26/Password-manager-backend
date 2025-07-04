import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try{
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log('Connected to MongoDB successfully');
    }catch(error){
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}



export default connectToMongoDB;