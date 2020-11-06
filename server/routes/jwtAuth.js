const router = require('express').Router();
const { db, User } = require('../db/index.js');
const bcrypt = require('bcryptjs');
const validEmail = require('../utils/validEmail');
const generateToken = require('../utils/jsonWebToken');
const authorize = require('../utils/authorize');

// Signup/Register a new user
router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    profilePhotoUrl: pic,
  } = req.body;
  try {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });
    if (existingUser === null && email.length && password.length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await db.query(`INSERT INTO users (first_name, last_name, email, password, profile_photo) 
      VALUES ('${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${pic}');`);

      const user = await User.findOne({
        where: {
          email,
        },
      });
      const jwtToken = generateToken(user.id);
      res.json({ jwtToken });
    } else {
      // 2.b. If user already exists, throw error
      res.status(401).json('Already registered');
    }
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Server error");
  }
});

// Verify (login) registered user
router.post('/login', validEmail, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      return res.status(401).json('Invalid credentials, line 53');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json('Invalid Password, line 58');
    }
    const jwtToken = generateToken(user.id);
    res.json({ jwtToken });
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Error logging in line 64 jwtAuth.js");
  }
});

router.post('/verify', authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.warn(err.message);
    res.status(500).send("Error verifying user token.");
  }
});

module.exports = router;
