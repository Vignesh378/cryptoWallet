const jwt=require('jsonwebtoken');
const secret='Vignesh@&123';
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email
    },secret)
}

function getUser(token){
  try{
    return jwt.verify(token,secret);
  }
  catch(error){
    return null;
  }
}

module.exports={
    getUser,setUser
}