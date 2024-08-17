const Students = require("../models/StudentsModel");
const asyncFunction = require("../midlewares/Async");

let addNewStudent = asyncFunction((req, res) => {
    let student = new Students({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        department: req.body.department
    });
    student
        .save()
        .then(() => { res.status(201, "Created").send(student) })
});

let getStudentById = asyncFunction(async (req, res) => {

    const { student_id } = req.params;
    let student = await Students.findOne({ student_id }).exec();
    if (!student) {
        return res.status(404, "Not Found").send(`Student with ${student_id} not found `);
    }
    else {
        res.status(200, "OK").send(student)

    }

});

let getAllStudents = asyncFunction(async (req, res) => {

    let students = await Students.find().sort({ student_id: -1 });
    res.status(200, "OK").send(students);

});

let updateStudent = asyncFunction(async (req, res) => {

    const { student_id } = req.params;
    let student = await Students.findOneAndUpdate({ student_id }, req.body, {
        returnOriginal: false
    });
    if (!student) {
        return res.status(404, "Not Found").send(`Student with ${student_id} not found `);
    }
    else {
        res.status(200, "OK").send(student)
    }
});

let deleteStudent = asyncFunction(async (req, res) => {
    const { student_id } = req.params;
    let student = await Students.findOneAndDelete({ student_id });
    if (!student) {
        return res.status(404, "Not Found").send(`Student with ${student_id} not found `);
    }
    else {
        res.status(200, "OK").send(`Student with ${student_id} is deleted successfully`)
    }
});

module.exports = {
    addNewStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};