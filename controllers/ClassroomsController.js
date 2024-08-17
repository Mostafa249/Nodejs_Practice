const Classrooms = require("../models/ClassroomsModel");
const asyncFunction = require("../midlewares/Async");


let addNewClassroom = asyncFunction((req, res) => {

    let classrooms = Classrooms({
        building: req.body.building,
        room_number: req.body.room_number,
        capacity: req.body.capacity
    });
    classrooms
        .save()
        .then(() => { res.status(201, "Created").send(classrooms) })
        .catch((err) => {
            for (let e in err)
                console.log(err.errors[e].message);
            res.status(400, "Bad Request").send("Invalid Data :)");
        });
});
let getClassroomsById = asyncFunction(async (req, res) => {
    const { room_id } = req.params;
    let classroom = await Classrooms.findOne({ room_id }).exec();
    if (!classroom) {
        res.status(404, "NOT Found").send(`Classroom with id ${room_id} not found`);
    }
    else {
        res.status(200, "OK").send(classroom);
    }
});

let getAllClassrooms = asyncFunction(async (req, res, nxt) => {

    let classrooms = await Classrooms.find().sort({ room_id: -1 });
    res.status(200, "OK").send(classrooms);
});

let updateClassroom = asyncFunction(async (req, res) => {
    const { room_id } = req.params;
    let classroom = await Classrooms.findOneAndUpdate({ room_id }, req.body, {
        returnOriginal: false
    });
    if (!classroom) {
        res.status(404, "Not Found").send(`Classroom with id ${room_id} not found`);
    }
    else {
        res.status(200, "OK").send(classroom);
    }
});

let deleteClassroom = asyncFunction(async (req, res) => {
    const { room_id } = req.params;
    let classroom = await Classrooms.findOneAndDelete({ room_id });
    if (!classroom) {
        res.status(404, "Not Found").send(`Classroom with id ${room_id} not found`);
    }
    else {
        res.status(200, "OK").send(`Classroom with id ${room_id} was deleted successfully `);
    }
});

module.exports = {
    addNewClassroom,
    getAllClassrooms,
    getClassroomsById,
    updateClassroom,
    deleteClassroom
}
