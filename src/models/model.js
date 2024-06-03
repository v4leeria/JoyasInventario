const format = require("pg-format");
const { pool } = require("../../db/connection.js");

const getData = async (limits = 5, page = 1, order = "id_ASC") => {
  try {
    const [campo, direccion] = order.split("_");
    const offset = (page - 1) * limits;
    const query = format(
      "SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L",
      campo,
      direccion,
      limits,
      offset
    );
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getJoyaId = async (id) => {
  try {
    const query = "SELECT * FROM inventario WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const getDataFilter = async (precio_max, precio_min, categoria, metal) => {
  try {
    const filters = [];
    const values = [];
    if (precio_max) {
      filters.push("precio <= $1");
      values.push(precio_max);
    }
    if (precio_min) {
      filters.push("precio >= $2");
      values.push(precio_min);
    }
    if (categoria) {
      filters.push("categoria = $3");
      values.push(categoria);
    }
    if (metal) {
      filters.push("metal = $4");
      values.push(metal);
    }

    const query = `SELECT * FROM inventario${
      filters.length ? " WHERE " + filters.join(" AND ") : ""
    }`;
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

module.exports = { getData, getJoyaId, getDataFilter };
