const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employeeSchema = new schema({
    title: {
        default: "",
        type: String,
    },
    name  : {
        default: "",
        type: String,
    },  
    dob   : {
        default: "",
        type: Date,
    },
    contactno : {
        default: "",
        type: String,
    },
    role : {
        default: "",
        type: String,
    },
    city : {
        default: "",
        type: String,
    },
    state : {
        default: "",
        type: String,
    },
    rated  : {
        default: false,
        type: Boolean,
    }
});

const employee = mongoose.model('employee', employeeSchema);

module.exports = {
    employee
}