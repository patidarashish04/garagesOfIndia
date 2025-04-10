const express = require('express');
const garageController = require('../controllers/garageController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });


// router.use(authController.protect);
router
  .route('/')
  //   .get(garageController.filterGarages, garageController.setHouseUserIds, garageController.getUserGarage)
  .get(garageController.getUserGarage)
  .post(garageController.createGarage)
//   router.use(authController.restrictTo('user', 'admin', 'owner'));
//   router.use(garageController.filterGarages);

router
  .route("/nearby")
  .get(garageController.nearByGarage); // ✅ near by garages

router
  .route('/:id')
  .get(garageController.getGarage)
  .patch(garageController.updateGarage)
  .delete(garageController.deleteGarage)

router
  .route("/:id/notify")
  .post(garageController.notifyGarageOwner); // ✅ New Route


module.exports = router;
