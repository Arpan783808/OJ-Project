import { Router } from "express";
import {runcode,judge} from "../controllers/authcontroller.js";
const router=Router();

router.post("/run", runcode);
router.post("/judge", judge);

export default router;