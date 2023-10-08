var LeaveModel = require('../models/leave');


let LeaveController = {
    create: async (req,res) => {

        const { employee, email, start_date, end_date } = req.body;
        const leave = await LeaveModel.create({
            employee,
            email,
            start_date,
            end_date
        });

        // const companyById = await Company.findById(id);
        // const staffById = await Staff.findById(staffId);

        // companyById.leaves.push(leave);
        // await companyById.save();

        // staffById.leaves.push(leave);
        // await staffById.save();

        return res.send(leave);
    },
    find: async (req,res) => {
        console.log(req.params); 
        let found = await LeaveModel.find({company: req.params.id})
        res.json(found);
    },
    findForStaff: async (req,res) => {
        let foundStaffLeaves = await LeaveModel.find({company: req.params.id, person_visited: req.params.staffId});
        res.json(foundStaffLeaves);
    },
    all: async (req,res) => {
        let allLeaves = await LeaveModel.find();
        res.json(allLeaves);
    },
    delete: async (req,res) => {
        let removeLeave = await LeaveModel.remove({_id: req.params.id});
        res.json(removeLeave);
    },
    edit: async (req,res) => {
        let editLeave = await LeaveModel.updateOne(
            {_id: req.body._id},
            { $set: {
                employee: req.body.employee,
                email: req.body.email,
                start_date: req.body.start_date,
                end_date: req.body.end_date,
            }});
        res.json(editLeave);
    }
}
module.exports = LeaveController