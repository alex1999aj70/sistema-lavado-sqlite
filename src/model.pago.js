function modelPago(controllerDB) {
  return {
    all() {
      controllerDB.open();
      const r = controllerDB.all(
        `SELECT p.*, cl.nombre AS cliente
         FROM PAGO p
         JOIN CITA c ON p.idCita = c.idCita
         JOIN CLIENTE cl ON c.idCliente = cl.idCliente;`
      );
      controllerDB.close();
      return r;
    },
    get(id) {
      controllerDB.open();
      const r = controllerDB.get("SELECT * FROM PAGO WHERE idPago=?;", [id]);
      controllerDB.close();
      return r;
    },
    create(datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "INSERT INTO PAGO(fecha_pago,monto_total,metodo_pago,idCita) VALUES(@fecha_pago,@monto_total,@metodo_pago,@idCita);",
        datos
      );
      controllerDB.close();
      return r;
    },
    update(id, datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "UPDATE PAGO SET fecha_pago=@fecha_pago, monto_total=@monto_total, metodo_pago=@metodo_pago, idCita=@idCita WHERE idPago=@id;",
        { ...datos, id }
      );
      controllerDB.close();
      return r;
    },
    remove(id) {
      controllerDB.open();
      const r = controllerDB.run("DELETE FROM PAGO WHERE idPago=?;", [id]);
      controllerDB.close();
      return r;
    },
  };
}

export default modelPago;