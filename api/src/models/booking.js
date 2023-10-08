var mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
var BookingSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
    },
    company_name: {
        type: String,
    },
    address: {
        type: String,
    },
    id_number: {
        type: String
    },
    vehicle_reg: {
        type: String,
    },
    purpose_of_visit: {
        type: String,
    },
    booking_ref_no: {
        type: String,
    },
    barcode: {
        type: String,
    },
    visit_date: {
        type: Date,
    },
    notes: {
        type: String,
    },
    date_booking_made: {
        type: Date,
        default: Date.now
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    person_visited: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },
    booking_made_by: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
      });

BookingSchema.virtual('person_visited_details',{
    ref: 'Staff',
    localField: 'person_visited',
    foreignField: 'visitors'
});

// BookingSchema.set('toObject', { virtuals: true });
// BookingSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Booking', BookingSchema);