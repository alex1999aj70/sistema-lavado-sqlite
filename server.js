import express from "express";
import controllerDbSqlite from "./controller.db.js";
import modelCliente from "./src/models/model.cliente.js";
import modelServicio from "./src/models/model.servicio.js";
import modelCita from "./src/models/model.cita.js";
import modelPago from "./src/models/model.pago.js";
import createRoutes from "./src/routes/routes.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "lavado.db";

const app = express();
app.use(express.json());

const controllerDB = controllerDbSqlite(DB_NAME);

const clienteMdl  = modelCliente(controllerDB);
const servicioMdl = modelServicio(controllerDB);
const citaMdl     = modelCita(controllerDB);
const pagoMdl     = modelPago(controllerDB);

const router = createRoutes({ clienteMdl, servicioMdl, citaMdl, pagoMdl });
app.use("/", router);

app.listen(PORT, () => {
  console.log(`\n🚗  Sistema de Lavado - Backend`);
  console.log(`🟢  Servidor en http://${HOST}:${PORT}\n`);
});