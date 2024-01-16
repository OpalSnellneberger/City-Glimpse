const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiController = require('./reviewRoutes');

router.use('/users', userRoutes);
router.post('/storeData', apiController.storeRestaurant);

module.exports = router;
