const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
    staff_id: {
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
        default: "Teacher",
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    role: {
        type: String,
        default: "Teaching",
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    phone_number: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 11,
        required: true,
    },
},
    {
        collection: "staff"
    });

staffSchema.pre('validate', async function (next) {
    if (this.isNew) {
        try {
            const lastStaff = await this.constructor.findOne().sort({ staff_id: -1 });
            this.staff_id = lastStaff ? lastStaff.staff_id + 1 : 1;
        } catch (err) {
            return next(err);
        }
    }
    next();
});

const Staff = mongoose.model("staff", staffSchema);

module.exports = Staff;