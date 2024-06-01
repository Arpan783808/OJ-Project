import { Router } from "express";
import { signup,login,create,getAllProblems,getproblembyid,runcode,judge,deleteproblem,update } from "../controllers/authcontroller.js";
import  {jwtAuth}  from "../middleware/jwtAuth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/", jwtAuth);
router.post("/create",create);
router.get("/getAllProblems",getAllProblems);
router.get("/getproblembyid/:id",getproblembyid);
router.post("/run",runcode);
router.post("/judge",judge);
router.get("/deleteproblem/:id",deleteproblem);
router.put("/update/:id",update);
export default router;
