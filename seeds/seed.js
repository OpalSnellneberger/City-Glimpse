const sequelize = require('../config/connection');
const { User, Project, PocketWatch } = require('../models');

const userData = require('./userData.json');
const restaurantData = require('./restaurantData.json');
const reviewData = require('./reviewData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  // Sync the database and force a reset
  await sequelize.sync({ force: true });

  // Create users and restaurants
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const restaurants = await Restaurant.bulkCreate(restaurantData, {
    individualHooks: true,
    returning: true,
  });

  // Declare an array to store reviews
  const reviews = [];

  // Create reviews and populate the reviews array
  for (const review of reviewData) {
    const createdReview = await Review.create({
      ...review,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      restaurant_id: restaurants[Math.floor(Math.random() * restaurants.length)].id,
    });

    reviews.push(createdReview); // Add the created review to the array
  }

  // Create comments using the populated reviews array
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: users[Math.floor(Math.random() * users.length)].id,
      review_id: reviews[Math.floor(Math.random() * reviews.length)].id,
    });
  }

  // Exit the process when seeding is complete
  process.exit(0);
};

// Call the seedDatabase function
seedDatabase();
