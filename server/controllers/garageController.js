const Garage = require('../models/garageModel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const { sendWhatsAppMessage } = require("../utils/twilioClient"); // Import Twilio utility


exports.filterGarages = catchAsync(async (req, res, next) => {
  if (req.params.houseId) {
    req.docFilter = { house: req.params.houseId };
  } else {
    req.docFilter = { user: req.user.id };
  }
  next();
});

// Nested Garage
exports.setHouseUserIds = (req, res, next) => {
  //set house id from query if not specified in body
  if (!req.body.house) req.body.house = req.params.houseId;
  if (!req.body.user) req.body.user = req.user.id; //from Protect middleware
  next();
};

exports.getUserGarage = factory.getAll(Garage);
exports.getGarage = factory.getOne(Garage);
exports.createGarage = factory.createOne(Garage);
exports.updateGarage = factory.updateOne(Garage);
exports.deleteGarage = factory.deleteOne(Garage);

exports.nearByGarage = factory.findGarages(Garage);

exports.notifyGarageOwner = catchAsync(async (req, res, next) => {
  const { userName } = req.body;
  
  // Get garage details using factory pattern
  const garage = await Garage.findById(req.params.id);
  if (!garage) return next(new AppError("Garage not found", 404));

  // Garage owner's WhatsApp number
  const ownerPhone = garage.contact; 
  console.log('Garage owner has no WhatsApp number ', ownerPhone )
  if (!ownerPhone) return next(new AppError("Garage owner has no WhatsApp number", 400));

  // Send WhatsApp message
  const message = `${userName} has searched your garage.`;
  await sendWhatsAppMessage(ownerPhone, message);

  res.status(200).json({
    status: "success",
    message: "WhatsApp message sent successfully.",
  });
});