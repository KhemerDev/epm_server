import jwt from 'jsonwebtoken';

const auth= (req,res,next)=>{
  const authHeader= req.headers['authorization'];
  if(!authHeader){
    return res.status(401).json({message:"Acesso negado. Token ausente."});
  }

  const token= authHeader.split(' ')[1];
  if(!token){
    return res.status(401).json({message:"Acesso negado. Token inválido."});
  }

  try{
    let jwtKey= process.env.JWT_SECRET || 'supersecretkey';
    const decoded= jwt.verify(token,jwtKey);
    req.user= decoded;
    next();
  }catch(err){
    return res.status(403).json({message:"Token inválido."});
  }
};

export default auth;