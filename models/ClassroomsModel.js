const mongoose = require("mongoose");

const classroomsSchema = new mongoose.Schema({
    room_id: {
        type: Number,
        unique: true,
        required: true,
        min: 1,
        max: 10000
    },
    building: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    room_number: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    capacity: {
        type: Number,
        required: true,
        min: 10,
        max: 100
    }
},
    {
        collection: "classrooms"
    });

classroomsSchema.pre('validate', async function (next) {
    if (this.isNew) {
        try {
            const lastClassroom = await this.constructor.findOne().sort({ room_id: -1 });
            this.room_id = lastClassroom ? lastClassroom.room_id + 1 : 1;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const classrooms = mongoose.model("classrooms", classroomsSchema);

module.exports = classrooms;