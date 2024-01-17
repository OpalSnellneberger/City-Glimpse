const router = require('express').Router();
const { User, Review, Comment, Restaurant} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('landing');
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all restaurants for homepage on map
router.get('/homepage', async (req, res) => {
  try {
    const restaurantData = await User.findOne({
      where: {
        // id: req.session.user_id 
        id: 1 // remove later
      }
      // include: [
      //   {
      //     model: Restaurant,
      //   }
      // ]
    });
    // const savedRestaurants = restaurantData.map((savedRestaurant) => savedRestaurant.get({ plain: true }));

    res.render('map', { 
      // savedRestaurants,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'internal server error' });
  }
});


// // pull up one saved restaurant
// router.get('/restaurant/:id', async (req, res) => {
//   try {
//     const restaurantData = await Restaurant.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['email'],
//         },
//       ],
//     });

//     const savedRestaurants = restaurantData.get({ plain: true });

// need page to render with map and restaurant info
//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// router.get('/saved', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Review }],
//       include: [{ model: Comment }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }

  res.render('login');
});

module.exports = router;
