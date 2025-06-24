const express = require("express");
const router = express.Router();
const {metaData, allSketches, addUserToSketch, sketchWithUserInfo, sketchById, updateSketch} = require("../controllers/sketch");

router.post("/metaData", metaData);
router.get("/allSketches", allSketches);
router.post("/addUserToSketch", addUserToSketch);
router.post("/sketchById", sketchById);
router.post("/sketchWithUserInfo", sketchWithUserInfo);
router.post("/updateSketch", updateSketch);

module.exports = router;
