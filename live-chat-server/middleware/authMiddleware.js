const jwt = require("jsonwebtoken");
const User = require("../modals/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const isAdmin =async(req,res,next)=>{
  try{
      const user= await Users.findById(req.user._id)
      if(user.role !==1){
      return res.status(401).send({
  success:false,
  message:"UnAuthorized Access"
       })
  }else{
      next()
  }
  }catch(error){
      console.log(error);
      res.status(401).send({
          success:false,
          message:"Error in admin midddleware",
          error
      })
  }
}

module.exports = { protect , isAdmin};

