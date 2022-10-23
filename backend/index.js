import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import veterinarianRoutes from './routes/veterinarian.route.js';

const app = express();

app.use(express.json())
dotenv.config();

connectDB();

app.use('/api/veterinarian', veterinarianRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
})