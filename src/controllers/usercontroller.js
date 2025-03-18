import user from "../models/user.js"; 
import GenerateToken from "../middleware/token.js";

export const Signin = (req, res) => {
    res.send("Sign In Page");
};

export const Login = (req, res) => {
    const { id } = req.body;

   
    const UserIndex = user.findIndex(u => u.id == id); 

    if (UserIndex === -1) {  
        return res.status(403).json({ error: "Request denied" });
    }

    const token = GenerateToken(user[UserIndex].username); 

    res.setHeader("Content-Type", "application/json");
    res.status(202).json({ token });
};
