import express from "express";
const router = express.Router();

import controller from "../controllers/apiControllers";

// User calls
router.get("/loggingIn", controller.loggingIn);

router.get("/user", controller.getCurrentUser);
router.get("/user/:id", controller.getUser);
router.post("/editUser", controller.editUser);
router.post("/createUser", controller.createUser);

router.get("/allSkills", controller.allSkills);
router.post("/mentorsBySkills", controller.mentorsBySkills);
router.post("/addSkills", controller.addSkills);
router.post("/removeSkills", controller.removeSkills);

router.post("/addLearned", controller.addLearned);
router.post("/removeLearned", controller.removeLearned);

router.get("/events", controller.allEvents);
router.post('/createEvent', controller.createEvent);

router.post("/addConnections", controller.addConnections);
router.post("/updateConnections", controller.updateConnections);

router.get("/chat/:id", controller.getChat);
router.post("/chat/:id", controller.postMessage);

// Admin calls
router.post("/createSkill", controller.createSkill);

export default router;
