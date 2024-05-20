import mongoose from 'mongoose';

mongoose.connect("mongodb://localhost:27017/")
    .then( () => {
        console.log('Successfully connected to the database.')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })


module.exports = mongoose;