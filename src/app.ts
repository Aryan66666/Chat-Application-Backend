import express from 'express';
import { errorMiddleware } from './middlewares/error-middleware';
import cors from 'cors';
import { userAuthentication } from './middlewares/user-authentication';
const app = express();

app.use(cors())
app.use(express.json());
app.use(userAuthentication)
app.use(errorMiddleware)

export default app;