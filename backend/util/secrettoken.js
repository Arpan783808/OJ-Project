import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const createsecrettoken=(id)=>{
 
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 3 * 24 * 60 * 60,
    });
} ;

export default createsecrettoken;