const axios = require('axios');
const { Router } = require('express');
const { cloudinary } = require('../utils/cloudinary');
const { User } = require('../db/index');

// const { multerUploads, dataUri } = require('../middleware/multer');

const imageRouter = Router();

imageRouter.get('/', (req, res) => {
  res.send('You made a get request but you ain\'t getting nothin\' back!');
});

imageRouter.get('/newProfilePicture', async (req, res) => {
  const { image } = req.query;
  const uploadedImage = await cloudinary.uploader
    .upload(image);
  res.send(uploadedImage.url);
});

imageRouter.post('/newPhoto', async (req, res) => {
  const { data } = req.body;
  const uploadedImage = await cloudinary.uploader
    .upload(data);
  res.send(uploadedImage.url);
});

imageRouter.post('/profile', async (req, res) => {
  try {
    const fileString = req.body.data;
    const uploadedImage = await cloudinary.uploader
      .upload(fileString);
    res.json({ data: uploadedImage });
    res.end();
  } catch (error) {
    console.warn(error);
    res.status(500).json({ msg: error });
  }
});

imageRouter.put('/editProfilePic/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data } = req.body;
  const newImage = await cloudinary.uploader
    .upload(data);
  const newUserStuff = await User.update({
    profile_photo: newImage.url,
  }, {
    where: { id: userId },
  });
  res.send(newImage.url);
});

module.exports = {
  imageRouter,
};
