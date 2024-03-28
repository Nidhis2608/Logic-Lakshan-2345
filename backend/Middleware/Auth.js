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
                req.role=decoded.role
                console.log("decoded",decoded)
                console.log("Req-Body",req.body)
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