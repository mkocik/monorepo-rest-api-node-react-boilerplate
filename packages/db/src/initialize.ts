import mongoose from 'mongoose';
import CONFIG from '@monorepo-boilerplate/config';

// Connecting to the database
export default (async () => {
    try {
        await mongoose.connect(
            CONFIG.DB_HOST,
            {
                useNewUrlParser: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
        // listen for requests
        console.log('The conection is Ok');
    } catch (err) {
        console.log(`${err} Could not Connect to the Database. Exiting Now...`);
        process.exit();
    }
});
