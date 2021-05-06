const express = require('express');
const router = express.Router();
const {getRobots , addRobot, deleteRobot, rotateLeft, rotateRight, moveRobot} = require('../controller/robotsController')


// get,Create , delete Robots
router
.route('/')
.get(getRobots)
.post(addRobot)
.delete(deleteRobot);

router.route('/left').post(rotateLeft);
router.route('/right').post(rotateRight);
router.route('/forward').post(moveRobot);

// export the router to app.js
module.exports = router;