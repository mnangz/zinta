var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

var VisitorSchema = new mongoose.Schema({
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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    id_number: {
        type: String,
        required: true
    },
    vehicle_reg: {
        type: String,
    },
    purpose_of_visit: {
        type: String,
        required: true
    },
    signed_out: {
      type: Boolean,
      default: false
    },
    visitor_seen: {
        type: Boolean,
        default: false
      },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    },
    person_visited: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },
    signed_in_by: {
        type: Schema.Types.ObjectId,
        ref: "Staff"
    },
  });
  VisitorSchema.plugin(timestamps);

  module.exports = mongoose.model('Visitor', VisitorSchema);