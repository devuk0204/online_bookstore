const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Card, Shipping_address, Shopping_basket, Basket_item, Book, Order, Order_item, User, Sequelize, Event_commercial, Week_tally, Month_tally} = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

router.get('/my_page', isLoggedIn, async (req, res, next) => {
  const id = req.user.id
  console.log(id);
  try {
    const cards = await Card.findAll({ where: {user_id: id}});
    const addresses = await Shipping_address.findAll({ where: {user_id: id}});
    const orders = await Order.findAll({ where: {user_id: id}})
    console.log(orders);
    res.render('my_page', {
        title: '마이페이지',
        cards: cards,
        addresses: addresses,
        orders: orders
    });
}catch(error) {
    console.error(error);
    next(error);
}
});

router.get('/basket', isLoggedIn, async (req, res, next) => {
  const id = req.user.id;
  try {
    const cards = await Card.findAll({ where: {user_id: id}});
    const addresses = await Shipping_address.findAll({ where: {user_id: id}});
    const basket = await Shopping_basket.findOne({ where: {user_id: id}});
    const items = await Basket_item.findAll(
      { where: {basket_no: basket.id}});
    const user = await User.findOne({where: {id: id}});
    res.render('basket', {
      cards: cards,
      addresses: addresses,
      basket: basket,
      items: items,
      user: user
    });
  } catch(error) {
    console.error(error);
    return res.send("<script>alert('아직 장바구니에 아무것도 넣지 않으셨습니다.'); history.back();</script>");
  }
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: '회원가입' });
});

router.get('/login', isNotLoggedIn, (req, res) => {
  res.render('login', { title: '로그인' });
});

router.get('/', async(req, res, next) => {
  try{
    const popups = await Event_commercial.findAll({
      attributes: ['reception_no'],
      where: {
        post_type: 2,
        status: 1
      } 
    });
    const events = await Event_commercial.findAll({
      limit: 5,
      where: {
        status: 1
      }
    });
    res.render('main', { title: '메인페이지', popups: popups, events: events });
  } catch(error) {
    console.error(error);
    next(error);
  }
});

router.get('/popup/:reception_no', async (req, res, next) => {
  try {
    const reception_no = req.params.reception_no;
    const popup = await Event_commercial.findOne({ 
      attributes: [reception_no, popup_img, title],
      where: {
        reception_no: reception_no,
      }});
    
    res.render('popup', { title: popup.title, popup: popup});
  } catch(error) {
    console.error(error);
    next(error);
  }
});


module.exports = router;
