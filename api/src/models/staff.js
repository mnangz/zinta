var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
  
var StaffSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    employment_type: {
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
    isHR: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
});
 
StaffSchema.pre('save',  function(next) {
    var staff = this;
 
     if (!staff.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(staff.password, salt, function(err, hash) {
             if (err) return next(err);
 
             staff.password = hash;
             next();
         });
     });
});
 
StaffSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('Staff', StaffSchema);