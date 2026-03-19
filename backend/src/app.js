import express from "express";
import cors from "cors";
import { env } from "./config/env.js"
import apiRutas from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const PORT = env.PORT || 3000;

app.use("/api", apiRutas);

app.get("/", (req, res) => {
  res.status(200).send("API corriendo con exito.");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.\n`);
});