require('dotenv').config();
const userData = require('./sampleData/users');
const listingData = require('./sampleData/listings');
const availabilityData = require('./sampleData/availabilities');
const requestData = require('./sampleData/requests');
const listingPhotosData = require('./sampleData/listingPhotos');

const {
  User,
  Survey,
  Request,
  ListingPhotos,
  Listing,
  Invite,
  Availability,
} = require('../db/index');

const seed = async () => {
  await User.bulkCreate(userData)
    .then(({ length }) => {
      if (length) {
        console.log(`✅🎃✅ ${length} users successfully added to DB`);
      } else {
        console.log('❌☠️❌ USERS not added');
      }
    });
  await Listing.bulkCreate(listingData)
    .then(({ length }) => {
      if (length) {
        console.log(`✅🎃✅ ${length} listings successfully added to DB`);
      } else {
        console.log('❌☠️❌ LISTINGS NOT ADDED');
      }
    });
  await Availability.bulkCreate(availabilityData)
    .then(({ length }) => {
      if (length) {
        console.log(`✅🎃✅ ${length} availabilities successfully added to DB`);
      } else {
        console.log('❌☠️❌ AVAILABILITIES NOT ADDED');
      }
    });
  await Request.bulkCreate(requestData)
    .then(({ length }) => {
      if (length) {
        console.log(`✅🎃✅ ${length} requests successfully added to DB`);
      } else {
        console.log('❌☠️❌ REQUESTS NOT ADDED');
      }
    });
  await ListingPhotos.bulkCreate(listingPhotosData)
    .then(({ length }) => {
      if (length) {
        console.log(`✅🎃✅ ${length} listing photos successfully added to DB`);
      } else {
        console.log('❌☠️❌ LISTING PHOTOS NOT ADDED');
      }
    });
};

seed();
