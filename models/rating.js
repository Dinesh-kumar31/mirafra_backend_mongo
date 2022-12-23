const mongoose = require('mongoose');
const { employee } = require('./employee');
const schema = mongoose.Schema;

const ratingSchema = new schema({
    communication: {
        default: '',
        type: String
    },
    collabrate_teamwork: {
        default: '',
        type: String
    },
    problemsolving: {
        default: '',
        type: String
    },   
    attendancepunctuality: {
        default: '',
        type: String
    },
    empId: {
        type: mongoose.ObjectId,
        ref: employee
    }
});

const rating = mongoose.model('rating', ratingSchema);

module.exports = {
    rating
}