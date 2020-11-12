const jwt = require("jsonwebtoken");

module.exports = async function(req, res, next){
  const bearerHeader = req.headers.authorization;
  if(typeof bearerHeader !== "undefined"){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if(!token){
      return res.status(403).json({
        message: 'Fuck off nigga. Let\'s just talk like adults',
        status: 403
      });
    }
    try{
      const decoded = jwt.verify(token, process.env.SECRET);
      req.member = decoded;
      return next();
    }catch(error){
      return res.status(500).json({errors: 'Server error'})
    }
  }else{
    return res.status(403).json({
      message: 'Fuck off nigga. Let\'s just talk like adults',
      status: 403
    });
  }
}