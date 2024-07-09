import mongoose from 'mongoose'

export default async function dbconnect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        })
        
        connection.on('error', (err) => {
            console.log("Mongodb connection error" + err);
            process.exit(1);
        })

    } catch (error) {
        console.log("error in db connection");
        console.log(error);
    }
}
