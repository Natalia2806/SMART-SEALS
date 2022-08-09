import express from "express";
import "dotenv/config.js";
import "./database/connectdb.js";
import authRoutes from "./routes/auth.routes.js";
import brigadeRoutes from "./routes/brigade.routes.js";
import workerRoutes from "./routes/workers.routes.js";
import elementRoutes from "./routes/elements.routes.js";
import { verificaToken } from "./middlewares/authenticate.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//RUTAS SIN TOKEN
app.use('/', authRoutes);

//RUTAS CON TOKEN 
app.use(verificaToken);
app.use('/brigade', brigadeRoutes)
app.use('/workers', workerRoutes)
app.use('/elements', elementRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("Server is running on port 5000: http://localhost:" + port);
});
