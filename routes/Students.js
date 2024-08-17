const express = require("express");
const studentsController = require("../controllers/StudentsController");
const StudentsValidator = require("../midlewares/StudentsValidatorMW")
const { adminAuth, adminOrStaffAuth } = require("../midlewares/AuthPermissionMW");

const router = express.Router();
router.use(express.json());



router.param("student_id", (req, res, nxt, val) => {
    if (Number(val)) {
        req.id = val;
        nxt();
    }
    else {
        res.status(400, "Bad Request").send("Invalid id");
    }
});

router.get('/:student_id', adminOrStaffAuth, studentsController.getStudentById);
router.get('/', adminOrStaffAuth, studentsController.getAllStudents);
router.post('/', StudentsValidator, adminAuth, studentsController.addNewStudent);
router.put('/:student_id', StudentsValidator, adminAuth, studentsController.updateStudent);
router.delete('/:student_id', adminAuth, studentsController.deleteStudent);

module.exports = router;