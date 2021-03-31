const db = require('../services/db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id_mahasiswa, nim, nama, jurusan 
    FROM mahasiswa LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(post) {
  const result = await db.query(
    `INSERT INTO mahasiswa
    (nim, nama, jurusan)
    VALUES (?, ?, ?)`,
    [
      post.nim, post.nama, post.jurusan
    ]
  );

  let message = 'Error POST'

  if (result.affectedRows) {
    message = 'Success'
  }

  return {message};
}

async function update(id_mahasiswa, put) {
  const result = await db.query(
    `UPDATE mahasiswa SET nim=?, nama=?, jurusan=? where id_mahasiswa=?`,
    [put.nim, put.nama, put.jurusan, id_mahasiswa]
  );

  let message = 'error update'

  if (result.affectedRows) {
    message = 'Succes Update'
  }

  return {message};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM mahasiswa where id_mahasiswa=?`, [id]
  );

  let message = 'Error delete'

  if (result.affectedRows) {
    message = 'Deleted Success'
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}