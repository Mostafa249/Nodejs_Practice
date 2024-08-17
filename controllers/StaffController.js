const Staff = require("../models/StaffModel");
const asyncFunction = require("../midlewares/Async");

let addNewStaff = asyncFunction((req, res) => {
    let staff = new Staff({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        department: req.body.department,
        role: req.body.role,
    });
    staff
        .save()
        .then(() => { res.status(201, "Created").send(staff) })
        .catch((err) => {
            for (let e in err)
                console.log(err.errors[e].message);

            res.status(400, "Bad Request").send("Invalid data :)")
        });
});

let getStaffById = asyncFunction(async (req, res) => {
    const { staff_id } = req.params;
    let staff = await Staff.findOne({ staff_id }).exec();
    if (!staff) {
        res.status(404, "Not Found").send(`Staff with ${staff_id} not found`);
    }
    else {
        res.status(200, "Ok").send(staff);
    }
});

let getAllStaff = asyncFunction(async (req, res) => {
    let staff = await Staff.find().sort({ staff_id: -1 });
    res.status(200, "OK").send(staff);
});

let updateStaff = asyncFunction(async (req, res) => {
    let { staff_id } = req.params;
    let staff = await Staff.findOneAndUpdate({ staff_id }, req.body, {
        returnOriginal: false
    });
    if (!staff) {
        res.status(404, "Not found").send(`Staff with ${staff_id} not found`);
    }
    else {
        res.status(200, "Ok").send(staff);
    }
});
let deleteStaff = asyncFunction(async (req, res) => {
    let { staff_id } = req.params;
    let staff = await Staff.findOneAndDelete({ staff_id });
    if (!staff) {
        return res.status(404, "Not Found").send(`Staff with ${staff_id} not found `);
    }
    else {
        res.status(200, "OK").send(`Staff with ${staff_id} is deleted successfully`)
    }
});

module.exports = {
    addNewStaff,
    getAllStaff,
    getStaffById,
    updateStaff,
    deleteStaff
};