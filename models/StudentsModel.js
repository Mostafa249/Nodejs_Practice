const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    student_id: {
        type: Number,
        unique: true,
        required: true,
        min: 1,
        max: 10000
    },
    first_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    department: {
        type: String,
        default: "Not Assigned",
        trim: true,
        minlength: 2,
        maxlength: 50
    },
},
    {
        collection: "students"
    });

studentsSchema.pre('validate', async function (next) {
    if (this.isNew) {
        try {
            const lastStudent = await this.constructor.findOne().sort({ student_id: -1 });
            this.student_id = lastStudent ? lastStudent.student_id + 1 : 1;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Students = mongoose.model("students", studentsSchema);

module.exports = Students;