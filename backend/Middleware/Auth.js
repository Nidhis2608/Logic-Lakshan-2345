const jwt=require("jsonwebtoken")

const auth= async(req,res,next)=>{
    const token = req.headers.authorization?.split(" ")[1]
    console.log("Token:", token); 
    if(token){
        jwt.verify(token,"masai",(err,decoded)=>{
            if(err){
                res.json({err})
            } else {
                req.body.userID=decoded.userID
                req.body.username=decoded.username
                console.log(decoded)
                console.log(req.body)
                next()
            }
        })
    } else {
        res.json("Please Login!!")
    }
}


module.exports={
    auth
}