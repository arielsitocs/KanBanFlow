import 'dotenv/config';
import express from "express";
import cors from "cors";

// rutas de api importadas //
import boardRoutes from "./routes/boards.js";
import taskRoutes from "./routes/tasks.js";
import userRoutes from "./routes/users.js";

const app = express();

// middlewares //
app.use(express.json());
app.use(cors());

// se aplican las rutas importadas con una url en especifico //
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}.`);
})

app.get("/api", (req, res) => {
  if (res.statusCode == 200) {
    res.send("<h1>API de KanBanFlow en funcionamiento.</h1>");
  } else {
    res.send("<h1>Error en el servidor</h1>")
  }
})

