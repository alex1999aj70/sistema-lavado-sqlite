function modelCita(controllerDB) {
  return {
    all() {
      controllerDB.open();
      const r = controllerDB.all(
        `SELECT c.*, cl.nombre AS cliente, u.nombre_usuario AS empleado
         FROM CITA c
         JOIN CLIENTE cl ON c.idCliente = cl.idCliente
         JOIN USUARIO u ON c.idUsuario = u.idUsuario;`
      );
      controllerDB.close();
      return r;
    },
    get(id) {
      controllerDB.open();
      const r = controllerDB.get(
        `SELECT c.*, cl.nombre AS cliente, u.nombre_usuario AS empleado
         FROM CITA c
         JOIN CLIENTE cl ON c.idCliente = cl.idCliente
         JOIN USUARIO u ON c.idUsuario = u.idUsuario
         WHERE c.idCita=?;`,
        [id]
      );
      controllerDB.close();
      return r;
    },
    create(datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "INSERT INTO CITA(fecha_hora,estado,idCliente,idUsuario) VALUES(@fecha_hora,@estado,@idCliente,@idUsuario);",
        datos
      );
      controllerDB.close();
      return r;
    },
    update(id, datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "UPDATE CITA SET fecha_hora=@fecha_hora, estado=@estado, idCliente=@idCliente, idUsuario=@idUsuario WHERE idCita=@id;",
        { ...datos, id }
      );
      controllerDB.close();
      return r;
    },
    remove(id) {
      controllerDB.open();
      const r = controllerDB.run("DELETE FROM CITA WHERE idCita=?;", [id]);
      controllerDB.close();
      return r;
    },
  };
}

export default modelCita;