var mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var LeaveSchema = new mongoose.Schema({
    employee: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
});

module.exports = mongoose.model('Leave', LeaveSchema);