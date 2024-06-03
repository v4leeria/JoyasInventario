const registro = (req, res, next) => {
  const time = new Date();
  const url = req.url;
  const queries = req.query;
  console.log(
    `
            Hola Admin el día ${time} se ejecutó una consulta al servidor.\n
    
            Los datos son: \n
            URL:  --> ${url}\n
            Queries: --> ${Object.entries(queries)}\n
    
            Saludos 👏👏;
            `
  );

  next();
};

module.exports = registro;
