const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("./db.js");
const Sequelize = require("sequelize");
const User = require("./models/user.model.js");
const jwt = require("jsonwebtoken");
const tokenAuth = require("./middleware/token.auth.js");




  

router.get("/", (req,res) => {
    res.json({message:"Welcome to application!"})
  });

router.get("/register",(req,res) =>{
    res.json({message:"This is register page"})

})
router.post("/register", async (req,res) =>{
    
    const member = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    const memberEmail =  await User.findOne({
        where: {
            email: req.body.email
        }
    })

    if(!member && !memberEmail){
        
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password,8),
        token: jwt.sign(req.body.username, "nesto")
    })
    .then((user) => res.status(400).send(`${user.username}, you have been registrated` + `token: ${user.token}`))
    .catch((err) => console.log(err))  
    }

    else{
        res.send({message:"There is a user with that username or email"})
    }
    
    

})


router.get("/log-in", (req,res) =>{
    res.json({message:"This is log in page"})
    
})

router.get("/log-in-success",(req,res) => {
    res.json({message:"Login successfull11"})
})



       
router.post("/log-in", tokenAuth, async (req, res) => { 
    try{
        const user = await User.findOne({
    where: {
        username: req.body.username
    }
});
if(!user){
    res.json({message:"No user found"})
}

if(user){
    const validated = await bcrypt.compare(req.body.password, user.password);

    if(validated){
        res.send({message:"Login successfull"})
    }

    else{
        res.send({message:"Wrong password!"});
        res.redirect("/log-in")
    }
}
}catch{
    error => console.log(error)
}}
    
)
   
    

module.exports = router;