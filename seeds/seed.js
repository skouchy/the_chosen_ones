const sequelize = require('../config/connection');
const { User, Trip } = require('../models');

const userData = require('./userData.json');
const tripData = require('./tripData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const trip = await Trip.bulkCreate(tripData, {
    individualHooks: true,
    returning: true,
  });

  for (const user of userData) {
    await User.create({
      ...user,
      trip_id: trip[Math.floor(Math.random() * trip.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
