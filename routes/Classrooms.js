const express = require("express");
const classroomValidator = require("../midlewares/ClassroomsValidatorMW");
const classroomController = require("../controllers/ClassroomsController");
const { adminAuth, adminOrStaffAuth } = require("../midlewares/AuthPermissionMW");

const router = express.Router();

router.use(express.json());

router.param("room_id", (req, res, nxt, val) => {
    if (Number(val)) {
        req.id = val;
        nxt();
    }
    else {
        res.status(400, "Bad Request").send("Invalid id");
    }
});

router.get('/:room_id', adminOrStaffAuth, classroomController.getClassroomsById);
router.get('/', adminOrStaffAuth, classroomController.getAllClassrooms);
router.post('/', adminOrStaffAuth, classroomValidator, classroomController.addNewClassroom);
router.put('/:room_id', adminAuth, classroomValidator, classroomController.updateClassroom);
router.delete("/:room_id", adminAuth, classroomController.deleteClassroom);

module.exports = router;