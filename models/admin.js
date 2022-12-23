const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema({
    email: {
        default: "",
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const admin = mongoose.model('admin', adminSchema);

module.exports = {
    admin
}