const sequelize = require('../config/connection');
const { User, Trip } = require('../models');

const userSeedData = require('./userData.json');
const tripSeedData = require('./tripData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Trips = await Trip.bulkCreate(tripSeedData);
  //   , {
  //   individualHooks: true,
  //   returning: true,
  // });


  // for (const user of userSeedData) {
  //   const newUser = await User.create({
  //     ...user,
  //     trip_id: trip_id,
  //   });
  // }

  process.exit(0);
};

seedDatabase();
