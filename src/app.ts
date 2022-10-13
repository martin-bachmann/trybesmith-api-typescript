import express from 'express';
import { productRoutes, userRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

app.use('/users', userRoutes);

export default app;
