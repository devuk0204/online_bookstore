const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Shopping_basket, Point_log }= require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { id, name, password, phone_number } = req.body;
  if(id == "" || name == "" || password == "") {
    return res.redirect('/join?inputError=notInsert');
  }
  else {
    try {
      const exUser = await User.findOne({ where: { id } });
      if (exUser) {
        return res.redirect('/join?error=exist');
      }
      const hash = await bcrypt.hash(password, 12);
      await User.create({
        id,
        name,
        password: hash,
        phone_number,
      });
      await Point_log.create({
        date: Date.now(),
        total_point: 0,
        description: '신규가입',
        change_point: 0,
        user_id: id
      });
      return res.redirect('/');
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const id = req.user.id;
      Shopping_basket.destroy({
        where: {
          user_id: id
        }
      });
      return res.redirect('/');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout', isLoggedIn, async (req, res) => {
  const id = req.user.id;
  await Shopping_basket.destroy({
    where: {
      user_id: id
    }
  });
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
