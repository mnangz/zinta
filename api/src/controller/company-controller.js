var CompanyModel = require("../models/company");
var Visitor = require('../models/visitor');
var Staff = require('../models/staff');

let CompanyController = {
    find: async (req,res) => {
        let found = await CompanyModel.find({_id: req.params.id});
        res.json(found);
    },
    all: async (req,res) => {
        let allCompanies = await CompanyModel.find();
        res.json(allCompanies);
    },
    create: async (req,res) => {
        let newCompany = new CompanyModel(req.body);
        let savedCompany = await newCompany.save();
        res.json(savedCompany);
    },
    delete: async (req,res) => {
        let removeCompany = await CompanyModel.remove({_id: req.params.id});
        res.json(removeCompany);
    },
    getAllStaff: async (req,res) => {
        let foundStaff = await CompanyModel.find({_id: req.params.id}).populate({path:'staff', model:'Staff' });
        res.json(foundStaff);
    },
    getAllBookings: async (req,res) => {
        let foundBookings = await CompanyModel.find({_id: req.params.id}).populate({path:'bookings', model:'Booking' });
        res.json(foundBookings);
    },
    getAllVisitors: async (req,res) => {
        let foundVisitors = await CompanyModel.find({_id: req.params.id}).populate({path:'visitors', model:'Visitor' });
        res.json(foundVisitors);
    },
    edit: async (req,res) => {
        let editCompany = await CompanyModel.updateOne(
            {_id: req.params.id},
            { $set: {
                company_name: req.body.company_name,
                company_email: req.body.company_email,
                company_phone_no: req.body.company_phone_no,
                company_address: req.body.company_address,
                company_logo: req.body.company_logo,
                company_color: req.body.company_color,
                } });
        res.json(editCompany);
    }
}
module.exports = CompanyController