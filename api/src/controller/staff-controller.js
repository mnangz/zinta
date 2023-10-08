var Staff = require('../models/staff');
var Company = require('../models/company');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(staff) {
    return jwt.sign({ id: staff.id, first_name: staff.first_name, last_name: staff.last_name, isHR: staff.isHR, company: staff.company }, config.jwtSecret, {
        expiresIn: 3600000
    });
}

let StaffController = {
    register: async (req,res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ 'msg': 'You need to send email and password' });
        }

        Staff.findOne({ username: req.body.username }, async (err, staff) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
     
            if (staff) {
                return res.status(400).json({ 'msg': 'The staff already exists' });
            }
        });


        company = req.params;
        id = company.id;
        const { username, first_name, last_name, email, position, employment_type, start_date, end_date, isHR, password} = req.body;
        const staff = await Staff.create({
            username,
            first_name,
            last_name,
            email,
            position,
            employment_type,
            start_date,
            end_date,
            isHR,
            password,
            company:id,
        });

        const companyById = await Company.findById(id);

        companyById.staff.push(staff);
        await companyById.save();

        return res.send(companyById);
    },
    login: async (req,res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ 'msg': 'You need to send email and password' });
        }

        Staff.findOne({ username: req.body.username }, async (err, staff) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
     
            if (!staff) {
                return res.status(400).json({ 'msg': 'The staff account does not exist' });
            }
     
            staff.comparePassword(req.body.password, (err, isMatch) => {
                if (isMatch && !err) {
                    return res.status(200).json({
                        token: createToken(staff)
                    }); 
                } else {
                    return res.status(400).json({ msg: 'The username and password don\'t match.' });
                }
            });
        });
    },
    find: async (req,res) => {
        let found = await Staff.find({company: req.params.id});
        res.json(found);
    },
    all: async (req,res) => {
        let allStaff = await Staff.find();
        res.json(allStaff);
    },
    delete: async (req,res) => {
        let removeStaff = await Staff.remove({_id: req.params.id});
        res.json(removeStaff);
    },
    edit: async (req,res) => {
        id = req.body._id;
        Staff.findById(id, function(err, staff) {
            if (err) return false;

            staff.username = req.body.username;
            staff.first_name = req.body.first_name;
            staff.last_name = req.body.last_name;
            staff.email = req.body.email;
            staff.position = req.body.position;
            staff.employement_type = req.body.employement_type;
            staff.start_date = req.body.start_date;
            staff.end_date = req.body.end_date;
            staff.isHR = req.body.isHR;
            staff.password = req.body.password;

            staff.save();

            res.json(staff);
        });
    },
    // getAllBookings: async (req,res) => {
    //     let foundBookings = await Staff.find({_id: req.params.id}).populate({path:'bookings', model:'Booking' });
    //     res.json(foundBookings);
    // },
    // getAllVisitors: async (req,res) => {
    //     let foundVisitors = await Staff.find({_id: req.params.id}).populate({path:'visitors', model:'Visitor' });
    //     res.json(foundVisitors);
    // },
}
module.exports = StaffController;