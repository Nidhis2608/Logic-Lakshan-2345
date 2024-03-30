const access=(...rolesPermitted)=>{
    return (req,res,next)=>{
        console.log("AccessRequest",req);
      if(rolesPermitted.includes(req.role)){
        next()
      } else {
        res.json({msg:"You don't have access"})
      }
    }
}

module.exports={
    access
}