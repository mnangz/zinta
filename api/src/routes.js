var express         = require('express'),
    routes          = express.Router();
var staffController  = require('./controller/staff-controller');
var visitorController  = require('./controller/visitor-controller');
var bookingController  = require('./controller/booking-controller');
var companyController  = require('./controller/company-controller');
var leaveController  = require('./controller/leave-controller');
var passport	    = require('passport');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const base64 = require('node-base64-image');
const fs = require('fs');
const mime = require('mime');

routes.get('/', (req, res) => {
    return res.send('Entrisec Standard API!');
});

// Company Routes
routes.get("/companies", companyController.all);
routes.get("/company/:id", companyController.find);
routes.post("/company/create", companyController.create);
routes.delete("/company/delete/:id", companyController.delete);
routes.patch("/company/edit/:id", companyController.edit);
routes.get("/company/:id/staff", companyController.getAllStaff);
routes.get("/company/:id/bookings", companyController.getAllBookings);
routes.get("/company/:id/visitors", companyController.getAllVisitors);

// Booking Routes
routes.get("/bookings", bookingController.all);
routes.get("/bookings/:id/", bookingController.find);
routes.get("/bookings/:id/staff/:staffId/", bookingController.findForStaff);
routes.post("/booking/:id/create/:staffId", bookingController.create);
routes.delete("/booking/delete/:id", bookingController.delete);
routes.patch("/booking/edit", bookingController.edit);

// Leave Routes
routes.get("/leaves", leaveController.all);
routes.get("/leaves/:id/", leaveController.find);
routes.get("/leaves/:id/staff/:staffId/", leaveController.findForStaff);
routes.post("/leave/:id/create/:staffId", leaveController.create);
routes.delete("/leave/delete/:id", leaveController.delete);
routes.patch("/leave/edit", leaveController.edit);

// Staff Routes
routes.get("/staff", staffController.all);
routes.get("/staff/:id", staffController.find);
routes.delete("/staff/delete/:id", staffController.delete);
routes.post("/staff/:id/register", staffController.register);
routes.post("/staff/login", staffController.login);
routes.patch("/staff/edit", staffController.edit);


// Visitor Routes
routes.get("/visitors", visitorController.all);
routes.get("/visitors/:id", visitorController.find);
routes.get("/visitors/:id/staff/:staffId", visitorController.findForStaff);
routes.get("/visitors/currently-signed-in/:id", visitorController.signed_in);
routes.get("/visitors/:id/currently-not-seen/:staffId", visitorController.visitorNotSeen);
routes.delete("/visitor/delete/:id", visitorController.delete);
routes.post("/visitor/:id/create/:staffId", visitorController.create);
routes.patch("/visitor/seen/:id", visitorController.visitor_seen);
routes.patch("/visitor/signout/:id", visitorController.sign_out);


module.exports = routes;
