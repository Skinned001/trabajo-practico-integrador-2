import express from 'express';
import cors from "cors";
import "dotenv/config";
import cookieParser from 'cookie-parser';
import { connectDB } from './src/config/database.js';
import { routes } from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
    origin: `https://localhost:${PORT}`,
    credentials: true,
};

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//rutas
app.use("api/", routes)

app.listen(PORT, async () => {
    try {
        connectDB();
        console.log(`Servidor escuchando en el puerto https://localhost:${PORT}`);
    } catch (error) {
        console.log("Error al encender el servidor" + error);
    }
});

