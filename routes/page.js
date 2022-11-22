const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Card, Shipping_address, Shopping_basket, Basket_item, Book, Order, Order_item, User} = require('../models');
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
    const items = await Basket_item.findAll({ where: {basket_no: basket.id}});
    const books = await Book.findAll({ where: {
      [Op.or]: {ISBN: items.ISBN}
    }});
    const user = await User.findOne({where: {id: id}});
    console.log(books);
    res.render('basket', {
      cards: cards,
      addresses: addresses,
      basket: basket,
      items: items,
      books: books,
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

router.get('/', (req, res) => {
  res.render('main');
});

module.exports = router;
