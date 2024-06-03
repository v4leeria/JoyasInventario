const { getData, getDataFilter, getJoyaId } = require("../models/model.js");

class JoyasController {
  async queryData(req, res) {
    try {
      const { limits = 5, page = 1, order = "id_ASC" } = req.query;
      const joyas = await getData(limits, page, order);
      if (!joyas.length) {
        return res.status(404).json({ error: "No se encontraron joyas" });
      }
      res.status(200).json({ joyas, limits, page, order });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async byId(req, res) {
    try {
      const { id } = req.params;
      const joya = await getJoyaId(id);
      if (!joya.length) {
        return res.status(404).json({ error: "Joya no encontrada" });
      }
      res.status(200).json(joya[0]);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async queryDataFilter(req, res) {
    try {
      const { precio_max, precio_min, categoria, metal } = req.query;
      const joyas = await getDataFilter(
        precio_max,
        precio_min,
        categoria,
        metal
      );
      if (!joyas.length) {
        return res.status(404).json({ error: "No se encontraron joyas" });
      }
      res.status(200).json(joyas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new JoyasController();
