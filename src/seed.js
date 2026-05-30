import Database from "better-sqlite3";

const DB_NAME = process.env.DB_NAME || "lavado.db";
const db = new Database(DB_NAME);

console.log("📦 Creando base de datos y tablas...\n");

db.exec(`
  CREATE TABLE IF NOT EXISTS ROL (
    idRol INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_rol TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS USUARIO (
    idUsuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario TEXT NOT NULL,
    contrasena TEXT NOT NULL,
    idRol INTEGER NOT NULL,
    FOREIGN KEY (idRol) REFERENCES ROL(idRol)
  );

  CREATE TABLE IF NOT EXISTS CLIENTE (
    idCliente INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    direccion TEXT
  );

  CREATE TABLE IF NOT EXISTS CATEGORIA_SERVICIO (
    idCategoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_categoria TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS SERVICIO (
    idServicio INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_servicio TEXT NOT NULL,
    descripcion TEXT,
    precio_base REAL NOT NULL,
    idCategoria INTEGER NOT NULL,
    FOREIGN KEY (idCategoria) REFERENCES CATEGORIA_SERVICIO(idCategoria)
  );

  CREATE TABLE IF NOT EXISTS CITA (
    idCita INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_hora TEXT NOT NULL,
    estado TEXT DEFAULT 'Pendiente',
    idCliente INTEGER NOT NULL,
    idUsuario INTEGER NOT NULL,
    FOREIGN KEY (idCliente) REFERENCES CLIENTE(idCliente),
    FOREIGN KEY (idUsuario) REFERENCES USUARIO(idUsuario)
  );

  CREATE TABLE IF NOT EXISTS DETALLE_CITA (
    idCita INTEGER NOT NULL,
    idServicio INTEGER NOT NULL,
    cantidad INTEGER DEFAULT 1,
    precio_aplicado REAL NOT NULL,
    PRIMARY KEY (idCita, idServicio),
    FOREIGN KEY (idCita) REFERENCES CITA(idCita),
    FOREIGN KEY (idServicio) REFERENCES SERVICIO(idServicio)
  );

  CREATE TABLE IF NOT EXISTS PAGO (
    idPago INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha_pago TEXT NOT NULL,
    monto_total REAL NOT NULL,
    metodo_pago TEXT NOT NULL,
    idCita INTEGER NOT NULL,
    FOREIGN KEY (idCita) REFERENCES CITA(idCita)
  );
`);

const insertRol = db.prepare("INSERT INTO ROL(nombre_rol) VALUES(@nombre_rol)");
[{nombre_rol:"Administrador"},{nombre_rol:"Empleado"},{nombre_rol:"Cajero"}]
  .forEach(r => insertRol.run(r));

const insertUsuario = db.prepare("INSERT INTO USUARIO(nombre_usuario,contrasena,idRol) VALUES(@nombre_usuario,@contrasena,@idRol)");
[
  {nombre_usuario:"admin", contrasena:"admin123", idRol:1},
  {nombre_usuario:"juan",  contrasena:"juan456",  idRol:2},
  {nombre_usuario:"maria", contrasena:"maria789", idRol:2},
  {nombre_usuario:"carlos",contrasena:"carlos321",idRol:3}
].forEach(u => insertUsuario.run(u));

const insertCliente = db.prepare("INSERT INTO CLIENTE(nombre,telefono,direccion) VALUES(@nombre,@telefono,@direccion)");
[
  {nombre:"Luis Hernández",   telefono:"9381234567", direccion:"Av. Principal #10"},
  {nombre:"Ana Torres",       telefono:"9389876543", direccion:"Calle 20 #45"},
  {nombre:"Pedro Ramírez",    telefono:"9385551234", direccion:"Col. Centro #33"},
  {nombre:"Sofía Mendoza",    telefono:"9384447890", direccion:"Fracc. Las Flores #7"},
  {nombre:"Roberto Castillo", telefono:"9383336789", direccion:"Calle 30 #12"}
].forEach(c => insertCliente.run(c));

const insertCat = db.prepare("INSERT INTO CATEGORIA_SERVICIO(nombre_categoria) VALUES(@nombre_categoria)");
[{nombre_categoria:"Lavado Exterior"},{nombre_categoria:"Lavado Interior"},
 {nombre_categoria:"Detallado Completo"},{nombre_categoria:"Servicios Especiales"}]
  .forEach(c => insertCat.run(c));

const insertServicio = db.prepare("INSERT INTO SERVICIO(nombre_servicio,descripcion,precio_base,idCategoria) VALUES(@nombre_servicio,@descripcion,@precio_base,@idCategoria)");
[
  {nombre_servicio:"Lavado Básico Exterior", descripcion:"Lavado con shampoo",      precio_base:80,  idCategoria:1},
  {nombre_servicio:"Lavado Premium",         descripcion:"Lavado + cera",           precio_base:150, idCategoria:1},
  {nombre_servicio:"Aspirado Interior",      descripcion:"Aspirado de alfombras",   precio_base:100, idCategoria:2},
  {nombre_servicio:"Limpieza Tapicería",     descripcion:"Limpieza con vapor",      precio_base:250, idCategoria:2},
  {nombre_servicio:"Detallado Completo",     descripcion:"Exterior + interior",     precio_base:450, idCategoria:3},
  {nombre_servicio:"Pulido Carrocería",      descripcion:"Corrección de pintura",   precio_base:600, idCategoria:4},
  {nombre_servicio:"Lavado de Motor",        descripcion:"Desengrasado y limpieza", precio_base:200, idCategoria:4}
].forEach(s => insertServicio.run(s));

const insertCita = db.prepare("INSERT INTO CITA(fecha_hora,estado,idCliente,idUsuario) VALUES(@fecha_hora,@estado,@idCliente,@idUsuario)");
[
  {fecha_hora:"2025-04-01 09:00:00", estado:"Completada", idCliente:1, idUsuario:2},
  {fecha_hora:"2025-04-02 10:30:00", estado:"Completada", idCliente:2, idUsuario:3},
  {fecha_hora:"2025-04-03 11:00:00", estado:"Pendiente",  idCliente:3, idUsuario:2},
  {fecha_hora:"2025-04-04 14:00:00", estado:"En proceso", idCliente:4, idUsuario:3},
  {fecha_hora:"2025-04-05 16:00:00", estado:"Pendiente",  idCliente:5, idUsuario:2}
].forEach(c => insertCita.run(c));

const insertDetalle = db.prepare("INSERT INTO DETALLE_CITA(idCita,idServicio,cantidad,precio_aplicado) VALUES(@idCita,@idServicio,@cantidad,@precio_aplicado)");
[
  {idCita:1,idServicio:1,cantidad:1,precio_aplicado:80},
  {idCita:1,idServicio:3,cantidad:1,precio_aplicado:100},
  {idCita:2,idServicio:5,cantidad:1,precio_aplicado:450},
  {idCita:3,idServicio:2,cantidad:1,precio_aplicado:150},
  {idCita:5,idServicio:1,cantidad:1,precio_aplicado:80}
].forEach(d => insertDetalle.run(d));

const insertPago = db.prepare("INSERT INTO PAGO(fecha_pago,monto_total,metodo_pago,idCita) VALUES(@fecha_pago,@monto_total,@metodo_pago,@idCita)");
[
  {fecha_pago:"2025-04-01 09:45:00", monto_total:180, metodo_pago:"Efectivo",       idCita:1},
  {fecha_pago:"2025-04-02 11:15:00", monto_total:450, metodo_pago:"Tarjeta débito", idCita:2}
].forEach(p => insertPago.run(p));

db.close();
console.log("✅ Base de datos lista. Ejecuta: npm run dev\n");