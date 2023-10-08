var mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var CompanySchema = new mongoose.Schema({
    company_id: {
        type: Number
    },
    company_name: {
        type: String
    },
    company_email: {
        type: String
    },
    company_phone_no: {
        type: String
    },
    company_address: {
        type: String
    },
    company_logo: {
        type: String
    },
    company_color: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    staff: [{
        type: Schema.Types.ObjectId,
        ref: "Staff"
    }],
    visitors: [{
        type: Schema.Types.ObjectId,
        ref: "Visitor"
    }],
    bookings: [{
        type: Schema.Types.ObjectId,
        ref: "Booking"
    }],

});

module.exports = mongoose.model('Company', CompanySchema);