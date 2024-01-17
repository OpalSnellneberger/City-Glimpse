const User = require('./User');
const Restaurant = require('./Restaurant');
const Comment = require('./Comment');
const Review = require('./Review');

User.hasMany(Review, {
    foreignKey: 'user_id',
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
});

User.hasMany(Restaurant, {
    foreignKey: ''
});

Restaurant.hasMany(Review, {
    foreignKey: 'restaurant_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});
Review.belongsTo(Restaurant, {
    foreignKey: 'restaurant_id',
});
Review.hasMany(Comment, {
    foreignKey: 'review_id',
});

// Comment.belongsTo(User, {
//     foreignKey: 'user_id',
// });
// Comment.belongsTo(Review, {
//     foreignKey: 'review_id',
// });  
  
module.exports = { User, Restaurant, Comment, Review };
