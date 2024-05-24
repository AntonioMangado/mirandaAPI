import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://antoniomangado:${process.env.MONGO_PASS}@cluster0.tv7s1gr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then( () => {
        console.log('Successfully connected to the database.')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })
    
module.exports = mongoose;