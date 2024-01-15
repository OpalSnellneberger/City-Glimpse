// controllers/reviewRoutes.js
const dataModel = require('../../models/dataStorage');

function storeRestaurant(req, res) {
  const { dataToStore } = req.body;

  dataModel.storeRestaurant(dataToStore, (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Data stored successfully' });
    }
  });
}

module.exports = {
  storeData,
};
