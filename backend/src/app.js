import express from "express";
import cors from "cors";
import { env } from "./config/env.js"
import apiRutas from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use("/api", apiRutas);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).send("API corriendo con exito.");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}.\n`);
});