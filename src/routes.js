import { Router } from "express";

function createRoutes(models) {
  const router = Router();
  const { clienteMdl, servicioMdl, citaMdl, pagoMdl } = models;

  // CLIENTES
  router.get("/clientes", (req, res) => res.send(clienteMdl.all()));
  router.get("/clientes/:id", (req, res) => {
    const dato = clienteMdl.get(req.params.id);
    if (!dato) return res.status(404).send({ message: "Cliente no encontrado" });
    res.send(dato);
  });
  router.post("/clientes", (req, res) => {
    const r = clienteMdl.create(req.body);
    res.status(201).send({ idCliente: r.lastInsertRowid, ...req.body });
  });
  router.put("/clientes/:id", (req, res) => {
    clienteMdl.update(req.params.id, req.body);
    res.send({ message: "Cliente actualizado" });
  });
  router.delete("/clientes/:id", (req, res) => {
    clienteMdl.remove(req.params.id);
    res.send({ message: "Cliente eliminado" });
  });

  // SERVICIOS
  router.get("/servicios", (req, res) => res.send(servicioMdl.all()));
  router.get("/servicios/:id", (req, res) => {
    const dato = servicioMdl.get(req.params.id);
    if (!dato) return res.status(404).send({ message: "Servicio no encontrado" });
    res.send(dato);
  });
  router.post("/servicios", (req, res) => {
    const r = servicioMdl.create(req.body);
    res.status(201).send({ idServicio: r.lastInsertRowid, ...req.body });
  });
  router.put("/servicios/:id", (req, res) => {
    servicioMdl.update(req.params.id, req.body);
    res.send({ message: "Servicio actualizado" });
  });
  router.delete("/servicios/:id", (req, res) => {
    servicioMdl.remove(req.params.id);
    res.send({ message: "Servicio eliminado" });
  });

  // CITAS
  router.get("/citas", (req, res) => res.send(citaMdl.all()));
  router.get("/citas/:id", (req, res) => {
    const dato = citaMdl.get(req.params.id);
    if (!dato) return res.status(404).send({ message: "Cita no encontrada" });
    res.send(dato);
  });
  router.post("/citas", (req, res) => {
    const body = { estado: "Pendiente", ...req.body };
    const r = citaMdl.create(body);
    res.status(201).send({ idCita: r.lastInsertRowid, ...body });
  });
  router.put("/citas/:id", (req, res) => {
    citaMdl.update(req.params.id, req.body);
    res.send({ message: "Cita actualizada" });
  });
  router.delete("/citas/:id", (req, res) => {
    citaMdl.remove(req.params.id);
    res.send({ message: "Cita eliminada" });
  });

  // PAGOS
  router.get("/pagos", (req, res) => res.send(pagoMdl.all()));
  router.get("/pagos/:id", (req, res) => {
    const dato = pagoMdl.get(req.params.id);
    if (!dato) return res.status(404).send({ message: "Pago no encontrado" });
    res.send(dato);
  });
  router.post("/pagos", (req, res) => {
    const r = pagoMdl.create(req.body);
    res.status(201).send({ idPago: r.lastInsertRowid, ...req.body });
  });
  router.put("/pagos/:id", (req, res) => {
    pagoMdl.update(req.params.id, req.body);
    res.send({ message: "Pago actualizado" });
  });
  router.delete("/pagos/:id", (req, res) => {
    pagoMdl.remove(req.params.id);
    res.send({ message: "Pago eliminado" });
  });

  return router;
}

export default createRoutes;