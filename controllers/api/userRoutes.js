// NOTE: TODO's are things to imporve from here rather than necessary components
const router = require('express').Router();
const { User } = require('../../models');

// User registration route
router.post('/', async (req, res) => {
  try {
    // Create a new user with the provided data
    const userData = await User.create(req.body);

    // Save user information in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    // Handle registration errors
    res.status(400).json(err);
  }
});

// TODO: Handle registration errors diferently when it's user imput thats the error (incorect username or password) or something else 
// User login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Login request: ", req.body);

    // Find user by email
    const userData = await User.findOne({ where: { email: req.body.email } });

    // Check if user exists
    if (!userData) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Validate password
    const validPassword = await userData.checkPassword(req.body.password);

    // Check if password is valid
    if (!validPassword) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save user information in the session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    // Handle login errors
    res.status(400).json({ message: "Error occurred during login." });
  }
});

// User logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;