import { Router } from "express";
import { signup,login,create } from "../controllers/authcontroller.js";
import  {jwtAuth}  from "../middleware/jwtAuth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/", jwtAuth);
router.post("/create",create);
// router.get("/showproblem",showproblem);

export default router;
