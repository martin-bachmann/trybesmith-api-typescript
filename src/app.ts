import express from 'express';
import { orderRoutes, productRoutes, userRoutes, loginRoutes } from './routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

app.use('/users', userRoutes);

app.use('/orders', orderRoutes);

app.use('/login', loginRoutes);

export default app;
