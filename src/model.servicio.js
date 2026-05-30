function modelServicio(controllerDB) {
  return {
    all() {
      controllerDB.open();
      const r = controllerDB.all(
        `SELECT s.*, c.nombre_categoria
         FROM SERVICIO s
         JOIN CATEGORIA_SERVICIO c ON s.idCategoria = c.idCategoria;`
      );
      controllerDB.close();
      return r;
    },
    get(id) {
      controllerDB.open();
      const r = controllerDB.get(
        `SELECT s.*, c.nombre_categoria
         FROM SERVICIO s
         JOIN CATEGORIA_SERVICIO c ON s.idCategoria = c.idCategoria
         WHERE s.idServicio=?;`,
        [id]
      );
      controllerDB.close();
      return r;
    },
    create(datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "INSERT INTO SERVICIO(nombre_servicio,descripcion,precio_base,idCategoria) VALUES(@nombre_servicio,@descripcion,@precio_base,@idCategoria);",
        datos
      );
      controllerDB.close();
      return r;
    },
    update(id, datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "UPDATE SERVICIO SET nombre_servicio=@nombre_servicio, descripcion=@descripcion, precio_base=@precio_base, idCategoria=@idCategoria WHERE idServicio=@id;",
        { ...datos, id }
      );
      controllerDB.close();
      return r;
    },
    remove(id) {
      controllerDB.open();
      const r = controllerDB.run("DELETE FROM SERVICIO WHERE idServicio=?;", [id]);
      controllerDB.close();
      return r;
    },
  };
}

export default modelServicio;