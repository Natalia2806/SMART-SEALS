import mongoose from 'mongoose';

try {
    await mongoose.connect(process.env.URL_MONGO_DB);
    console.log('Connected to MongoDB');
} catch (err) {
    console.log('Error de conexion' + err);
}

