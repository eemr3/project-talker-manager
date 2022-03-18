const validateTalkObj = (req, res, next) => {
  const { talk } = req.body;
  const validateDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  if (validateDate.test(talk.watchedAt) === false) {
    return res.status(400)
       .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
     }
   
     if (typeof talk.rate === 'string' || talk.rate < 1 || talk.rate > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5',
      });
     }
  
  next();
};

const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk || !talk.watchedAt || !talk.rate) {
  return res.status(400).json({
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    }); 
  }
  validateTalkObj(req, res, next);

  next();
};

module.exports = validateTalk;