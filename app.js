import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from 'dotenv';
config();
const app = express();
// settings
app.set('port', process.env.PORT || 5000);
app.set('json spaces', 2);
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
export default app;
