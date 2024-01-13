const router = require('express').Router();
const userRoutes = require('./userRoutes');
const apiController = require('./reviewRoutes');

router.use('/review', userRoutes);
router.post('/storeData', apiController.storeData);

module.exports = router;
