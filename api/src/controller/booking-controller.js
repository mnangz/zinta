var BookingModel = require('../models/booking');
var Staff = require('../models/staff');
var Company = require('../models/company');

let BookingController = {
    create: async (req,res) => {
        // let newBooking = new BookingModel(req.body);
        // let savedBooking = await newBooking.save();
        // res.json(savedBooking);

        company = req.params;
        id = company.id;
        staffId = req.body.person_visited;
        bookingMadeById = company.staffId;
        const { first_name, last_name, mobile, email, company_name, address, id_number, vehicle_reg, 
            purpose_of_visit, notes, booking_ref_no, barcode, visit_date } = req.body;
        const booking = await BookingModel.create({
            first_name,
            last_name,
            mobile,
            email,
            company_name,
            address,
            id_number,
            vehicle_reg,
            purpose_of_visit,
            notes,
            person_visited:staffId, 
            booking_ref_no,
            barcode,
            visit_date,
            company:id,
            booking_made_by: bookingMadeById,
        });

        const companyById = await Company.findById(id);
        const staffById = await Staff.findById(staffId);

        companyById.bookings.push(booking);
        await companyById.save();

        staffById.bookings.push(booking);
        await staffById.save();

        return res.send(booking);
    },
    find: async (req,res) => {
        console.log(req.params); 
        let found = await BookingModel.find({company: req.params.id})
        // .populate('person_visited_details')
        // .exec(function(err, psn){
            
            
        // })
        ;
        // .populate('person_visited')
        // .exec()
        // .then(docs => {
        // res.status(200).json({
        //     count: docs.length,
        //     bookings: docs.map(doc => {
        //     return {
        //         _id: doc._id,
        //         person_visited: doc.person_visited,
        //     };
        //     })
        // });
        // })
        // .catch(err => {
        //     res.status(500).json({
        //       error: err
        //     });
        //   });
        res.json(found);
    },
    findForStaff: async (req,res) => {
        let foundStaffBookings = await BookingModel.find({company: req.params.id, person_visited: req.params.staffId});
        res.json(foundStaffBookings);
    },
    all: async (req,res) => {
        let allBookings = await BookingModel.find();
        res.json(allBookings);
    },
    delete: async (req,res) => {
        let removeBooking = await BookingModel.remove({_id: req.params.id});
        res.json(removeBooking);
    },
    edit: async (req,res) => {
        let editBooking = await BookingModel.updateOne(
            {_id: req.body._id},
            { $set: {first_name: req.body.first_name,
                last_name: req.body.last_name,
                mobile: req.body.mobile,
                email: req.body.email,
                company_name: req.body.company_name,
                address: req.body.address,
                id_number: req.body.id_number,
                vehicle_reg: req.body.vehicle_reg,
                purpose_of_visit: req.body.purpose_of_visit,
                person_visited: req.body.person_visited,
                visit_date: req.body.visit_date} });
        res.json(editBooking);
    }
}
module.exports = BookingController