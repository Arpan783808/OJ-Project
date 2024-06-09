import { Router } from "express";
import { signup,login,create,getAllProblems,getproblembyid,deleteproblem,update, getleaderboard, getbydifficulty } from "../controllers/authcontroller.js";
import  {jwtAuth}  from "../middleware/jwtAuth.js";
import { codeforcescontest } from "../controllers/codeforceapi.js";
 "../controllers/codeforceapi.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/", jwtAuth);
router.post("/create",create);
router.get("/getAllProblems",getAllProblems);
router.get("/getproblembyid/:id",getproblembyid);
router.get("/deleteproblem/:id",deleteproblem);
router.put("/update/:id",update);
router.get("/leaderboard",getleaderboard);
router.get("/getbydifficulty",getbydifficulty);
router.get("/upcomingcontest",codeforcescontest);
export default router;
