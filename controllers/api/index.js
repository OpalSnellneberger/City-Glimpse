const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
// const { storeRestaurant, getSavedRestaurants } = require('./reviewRoutes');
// const apiController = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/api', reviewRoutes);
// router.post('/storeRestaurant', apiController.storeRestaurant);
// router.post('/storeReview', apiController.storeReview);


// router.post('/api/storeRestaurant', reviewRoutes);
// router.get('/api/savedRestaurants', reviewRoutes);

module.exports = router;