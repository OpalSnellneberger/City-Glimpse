const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiController = require('./reviewRoutes');

router.use('/users', userRoutes);
router.post('/storeRestaurant', apiController.storeRestaurant);
router.post('/storeReview', apiController.storeReview);

module.exports = router;
