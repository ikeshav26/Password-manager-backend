import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectToMongoDB from './src/config/mongoDb.config.js';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/user.routes.js';
import passwordRoutes from './src/routes/password.routes.js';



dotenv.config();

const app = express();
connectToMongoDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())




app.get('/', (req, res) => {
  res.send('password manager');
});

app.use('/api/user',userRoutes)
app.use('/api/password', passwordRoutes);




app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});