const express = require('express');
const axios = require('axios');
const router = express.Router();
const User = require('../models/user');
const passport = require('../passport');

// Sign Up
router.post('/signup', (req, res) => {
  const {
    username,
    password,
    companyName,
    contactName,
    contactPhone,
    contactEmail,
  } = req.body;

  // ADD VALIDATION
  User.findOne({ username }, (err, user) => {
    if (err) {
      console.log('User model post error: ', err);
    } else if (user) {
      res.json({
        error: `A user with this username already exists!`,
      });
    } else {
      axios
        .post(
          'https://api.clickup.com/api/v2/folder/17060726/list',
          { name: companyName },
          {
            headers: {
              Authorization: '1495561_c50210781cfaf81dd192910d5835967f670e3cc0',
            },
          }
        )
        .then((response) => {
          const newUser = new User({
            username,
            password,
            companyName,
            contactName,
            contactPhone,
            contactEmail,
            clickupListId: response.data.id,
          });

          newUser.save((err, savedUser) => {
            if (err) return res.json(err);
            res.json(savedUser);
          });
        })
        .catch((err) => console.log('User create failed', err));
    }
  });
});

// Log in
router.post(
  '/login',
  (req, res, next) => {
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    var userInfo = {
      username: req.user.username,
    };
    console.log('user info', userInfo);
    res.send(userInfo);
  }
);

router.get('/', (req, res, next) => {
  console.log('user: ', req.user);
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

// Log out
router.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.send(req.user);
  } else {
    res.send({ msg: 'no user to log out!' });
  }
});

router.get('/user', async (req, res) => {
  if (req.user) {
    const user = await User.findById(req.user._id).exec();
    res.send(user);
  } else res.send('');
});

module.exports = router;
