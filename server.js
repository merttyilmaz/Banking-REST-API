import express from 'express';

import bankRoutes from './routes/bankRoutes.js'

const app = express();

app.use(express.json());

app.use('/', bankRoutes);

app.listen(5000,() => console.log('Server running on port 5000'));