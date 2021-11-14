
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>{
    const token = req.body.token;

    if(!token){
        return res.send({message:"A token is required!"})
    }
    
    else{
        try{
        
            const decoded = jwt.verify(token, "nesto");
        if(req.username = decoded){
           return next(); 
        }}
       

        catch(err){
            return res.send({message:`${err}`});
        }
    }
    
        
}
