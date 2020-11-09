const axios = require('axios');
const { Router } = require('express');

const mapRouter = Router();

mapRouter.get('/api/geocode/:query', (req, res) => {
  const { query } = req.params;
  axios({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?`,
    method: 'get',
    params: {
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    },
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
  }).then((response) => res.send(response.data))
    .catch((err) => console.warn(err));
});

mapRouter.get('/listing/geocode/:query', (req, res) => {
  const { query } = req.params;
  axios({
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?`,
    method: 'get',
    params: {
      access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
    },
  }).then((response) => {
    res.send(response.data.features[0].center);
  })
    .catch((err) => console.warn(err));
});

module.exports = {
  mapRouter,
};
