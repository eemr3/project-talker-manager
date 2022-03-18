const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.lenght === 0) {
    res.status(400)
      .json({ message: 'O campo "name" é obrigatório' }); 
  }

  if (name.lenght < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
  }
  
  next();
};

module.exports = validateName;