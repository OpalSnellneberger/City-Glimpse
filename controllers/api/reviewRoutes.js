// controllers/reviewRoutes.js
// const dataModel = require('../../models/dataStorage');
const express = require('express');
const router = express.Router();
const { Restaurant, User } = require('../../models');

// save restaurants
router.post('/storeRestaurant', async (req, res) => {
  try {
    const { name, address, latitude, longitude, type } = req.body;
    if (!name || !address || !latitude || !longitude || !type) {
      return res.status(400).json({ message: 'Invalid restaurant data' });
    }
    const userId = req.session.user_id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newRestaurant = await Restaurant.create({
      name,
      address,
      latitude,
      longitude, 
      type,
    });
    res.status(201).json(newRestaurant); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// fetch saved restaurants for a user
router.get('/savedRestaurants', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.session.user_id }, 
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    savedRestaurantIDS = user.favorite_restaurants.split(',') || [];
    let savedRestaurants = [];
    for (ID of savedRestaurantIDS) {
      savedRestaurants.push(await restaurants.findByPkey(ID));
    }
    res.status(200).json(savedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// function storeRestaurant(req, res) {
//   console.log(res);
//   const { dataToStore } = req.body;

//   dataModel.storeRestaurant(dataToStore, (error, results) => {
//     if (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
//     } else {
//       res.status(200).json({ message: 'Data stored successfully' });
//     }
//   });
// }


// function storeReview(req, res) {
//   const { dataToStore } = req.body;

//   dataModel.storeReview(dataToStore, (error, results) => {
//     if (error) {
//       res.status(500).json({ message: 'Internal Server Error' });
//     } else {
//       res.status(200).json({ message: 'Data stored successfully' });
//     }
//   });
// }

// module.exports = {
//   storeRestaurant, storeReview
// };

module.exports = router;