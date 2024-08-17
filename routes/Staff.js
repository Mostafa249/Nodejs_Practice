const express = require("express");
const staffController = require("../controllers/StaffController");
const staffValidator = require("../midlewares/StaffValidatorMW");
const { adminAuth, adminOrStaffAuth } = require("../midlewares/AuthPermissionMW");

const router = express.Router();
router.use(express.json());

router.param("staff_id", (req, res, nxt, val) => {
    if (Number(val)) {
        req.id = val;
        nxt();
    }
    else {
        res.status(400, "Bad Request").send("Invalid id");
    }
});

router.get('/:staff_id', adminOrStaffAuth, staffController.getStaffById);
router.get('/', adminOrStaffAuth, staffController.getAllStaff);
router.post('/', adminAuth, staffValidator, staffController.addNewStaff);
router.put('/:staff_id', adminAuth, staffValidator, staffController.updateStaff);
router.delete("/:staff_id", adminAuth, staffController.deleteStaff);

module.exports = router;
