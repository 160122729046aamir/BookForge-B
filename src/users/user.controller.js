const JWT_SECRET = process.env.JWT_SECRET
const User = require('./user.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const adminController = async (req,res)=>{
    const {username,password} = req.body;1
    try {
        const admin = await User.findOne({username})
    if (!admin){
        return res.status(401).json("No User Found!")
    }
    // console.log(admin)
    // console.log(admin.password)
    if (admin.password!=password){
        return res.status(401).json("Invalid Credentials")
    }
    // The Below Code Is Used When We Saved Admin Using Signup Route
    // const isPasswordValid = await bcrypt.compare(password,admin.password)
    // if (!isPasswordValid){
    //     return res.status(401).json("Invalid Credentials")
    // }
    const token = jwt.sign({id:admin._id,username:admin.username,role: admin.role},JWT_SECRET,{expiresIn:'1h'})
    return res.status(200).json({
        message:"Admin LoggedIn Successfully!",
        token,
        admin: {
            username : admin.username,
            role : admin.role
        }
    })
    } catch (error) {
        console.error("Failed to login as admin", error.message);
        res.status(401).send({message: "Failed to login as admin"}) 
    }
    
}

module.exports={
    adminController
}