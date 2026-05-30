import Database from "better-sqlite3";

function controllerDbSqlite(dbFilePath) {
  let db = null;
  let dbOpen = false;

  return {
    open() {
      db = new Database(dbFilePath);
      dbOpen = true;
    },

    run(sql, params = []) {
      const stmt = db.prepare(sql);
      const r = stmt.run(params);
      return r;
    },

    get(sql, params = []) {
      const res = db.prepare(sql).get(params);
      return res;
    },

    all(sql, params = []) {
      const res = db.prepare(sql).all();
      return res;
    },

    close() {
      if (dbOpen) db.close();
      dbOpen = false;
    },
  };
}

export default controllerDbSqlite;