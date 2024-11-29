import express from 'express';
import cors from 'cors';

import privateRoutes from './routes/private.js';
import publicRoutes from './routes/public.js';

import auth from './middlewares/auth.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/svlogs", publicRoutes);
app.use("/svlogs", auth, privateRoutes);

app.listen(80, () => console.log("Servidor Rodando"));