let VisitorModel = require('../models/visitor');
var Staff = require('../models/staff');
var Company = require('../models/company');

let VisitorController = {
    create: async (req,res) => {
        // let newVisitor = new VisitorModel(req.body);
        // let savedVisitor = await newVisitor.save();
        // res.json(savedVisitor);

        console.log(req.params);
        company = req.params;
        id = company.id;
        staffId = company.staffId;
        staffVisitedId = req.body.person_visited;
        const { first_name, last_name, mobile, email, company_name, address, id_number, vehicle_reg, 
            purpose_of_visit } = req.body;
        const visitor = await VisitorModel.create({
            first_name,
            last_name,
            mobile,
            email,
            company_name,
            address,
            id_number,
            vehicle_reg,
            purpose_of_visit,
            company:id,
            person_visited:staffVisitedId,
            signed_in_by:staffId,
        });

        const companyById = await Company.findById(id);
        const staffById = await Staff.findById(staffVisitedId);

        companyById.visitors.push(visitor);
        await companyById.save();

        staffById.visitors.push(visitor);
        await staffById.save();

        return res.send(visitor);
    },
    find: async (req,res) => {
        let found = await VisitorModel.find({company: req.params.id});
        res.json(found);
    },
    findForStaff: async (req,res) => {
        let foundVisitors = await VisitorModel.find({company: req.params.id, person_visited: req.params.staffId});
        res.json(foundVisitors);
    },
    all: async (req,res) => {
        let allVisitors = await VisitorModel.find();
        res.json(allVisitors);
    },
    signed_in: async (req,res) => {
        const query = { company: req.params.id, signed_out: false };
        let visitors = await VisitorModel.find(query);
        res.json(visitors);
    },
    visitorNotSeen: async (req,res) => {
        const query = { company: req.params.id, person_visited: req.params.staffId, visitor_seen: false };
        let visitors = await VisitorModel.find(query);
        res.json(visitors);
    },
    sign_out: async (req,res) => {
        // let signOut = await VisitorModel.updateOne(
        //     {_id: req.params.id },
        //     { $set: { signed_out: true }},
        //     { new: true, upsert: true }
        // );

        
        // res.json(signOut);

        id = req.params.id;
        setting = true;
        let signOut = await VisitorModel.findById(id, function(err, visitor) {
            if (err) return false;

            visitor.signed_out = setting;
            
            visitor.save();

        });
        res.json(signOut);
    },
    visitor_seen: async (req,res) => {
        let visitorSeen = await VisitorModel.updateOne(
            {_id: req.params.id },
            { $set: { visitor_seen: true }}
        );
        res.json(visitorSeen);
    },
    delete: async (req,res) => {
        let removeVisitor = await VisitorModel.remove({_id: req.params.id});
        res.json(removeVisitor);
    },
}
module.exports = VisitorController