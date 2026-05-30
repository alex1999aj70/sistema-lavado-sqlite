function modelCliente(controllerDB) {
  return {
    all() {
      controllerDB.open();
      const r = controllerDB.all("SELECT * FROM CLIENTE;");
      controllerDB.close();
      return r;
    },
    get(id) {
      controllerDB.open();
      const r = controllerDB.get("SELECT * FROM CLIENTE WHERE idCliente=?;", [id]);
      controllerDB.close();
      return r;
    },
    create(datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "INSERT INTO CLIENTE(nombre,telefono,direccion) VALUES(@nombre,@telefono,@direccion);",
        datos
      );
      controllerDB.close();
      return r;
    },
    update(id, datos) {
      controllerDB.open();
      const r = controllerDB.run(
        "UPDATE CLIENTE SET nombre=@nombre, telefono=@telefono, direccion=@direccion WHERE idCliente=@id;",
        { ...datos, id }
      );
      controllerDB.close();
      return r;
    },
    remove(id) {
      controllerDB.open();
      const r = controllerDB.run("DELETE FROM CLIENTE WHERE idCliente=?;", [id]);
      controllerDB.close();
      return r;
    },
  };
}

export default modelCliente;