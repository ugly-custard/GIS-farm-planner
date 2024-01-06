import express from "express";
import morgan from "morgan";
import routes from "./routes/index.js";
import cors from 'cors'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
