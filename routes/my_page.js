const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const path = require('path');
const User = require('../models/user');
const Shipping_address = require('../models/shipping_address');
const Card = require('../models/card');
const Order_item = require('../models/order_item');
const Order  = require('../models/order');
const { Book } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

router.get('/edit', isLoggedIn, async (req, res, next) => {
    await res.render('../views/edit.html'); 
});

router.post('/edit', isLoggedIn, async (req, res, next) => {
    const { id, name, password, phone_number } = req.body;
    console.log(req.body);
    if(name == "" || password == "") {
        return res.redirect('/my_page?inputError=notInsert');
    }
    else {
        try {
            const hash = await bcrypt.hash(password, 12);
            await User.update({
                name: name,
                password: password.hash,
                phone_number: phone_number
            }, {
                where: { id: id }
            });
            return res.redirect('/my_page');
        } catch(error) {
            console.error(error);
            return next(error);
        }
    }
});

router.get('/address', isLoggedIn, async (req, res, next) => {
    await res.render('../views/address.html');
});

router.post('/address', isLoggedIn, async (req, res, next) => {
    console.log(req.body);
    const { id, postal_code, address1, address2 } = req.body;
    if(id == "" || postal_code == "" || address1 == "" || address2 == "") {
        return res.redirect('/my_page?inputError=notInsert');
    }
    else {
        try {
            const exAddress = await Shipping_address.findOne({ where: { user_id: id, postal_code: postal_code, address1: address1, address2: address2 } });
            if (exAddress) {
                return res.redirect('/my_page?addressError=exist');
            }
            await Shipping_address.create({
                user_id: id,
                postal_code: postal_code,
                address1: address1,
                address2: address2,
            });
            return res.redirect('/my_page');
        } catch(error) {
            console.error(error);
            next(error);
        }
    }
});

router.post('/address/delete', isLoggedIn, async (req, res, next) => {
    const { shipping_address_no } = req.body;
    try {
        await Shipping_address.destroy({
            where: {shipping_address_no: shipping_address_no}
        })
        return res.redirect('/my_page');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/card', isLoggedIn, async (req, res, next) => {
    await res.render('../views/card.html'); 
});

router.post('/card', isLoggedIn, async (req, res, next) => {
    const {id, card_no, card_expiry_date, card_type } = req.body;
    console.log(req.body);
    if(id == "" || card_no == "" || card_expiry_date == "") {
        return res.redirect('/my_page?inputError=notInsert');
    }
    else {
        try {
            const exCard = await Card.findOne({ where: { user_id: id, card_no: card_no } });
            if (exCard) {
                return res.redirect('/my_page?cardError=exist');
            }
            await Card.create({
                user_id: id,
                card_no: card_no,
                card_expiry_date: card_expiry_date,
                card_type: card_type
            });
            return res.redirect('/my_page');
        } catch(error) {
            console.error(error);
            next(error);
        }
    }
});

router.post('/card/delete', isLoggedIn, async (req, res, next) => {
    const id = req.user.id;
    console.log(req.body);
    const {card_no} = req.body;
    console.log(card_no);
    try {
        await Card.destroy({
            where: {user_id: id, card_no: card_no}
        })
        return res.redirect('/my_page');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/delete', isLoggedIn, async (req, res, next) => {
    const id = req.user.id;
    try {
        await User.destroy({
            where: {id: id}
        })
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/orders', isLoggedIn, async(req, res, next) => {
    try {
        console.log(req.body);
        const { order_no } = req.body;
        const orders = await Order_item.findAll({ where: { order_no: order_no }});
        const order = await Order.findOne({ where: {order_no: order_no }});
        console.log(order);
        console.log(orders);
        return res.render('orders', {
            title: '주문상세내역',
            orders: orders,
            order: order
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/order_cancel', isLoggedIn, async(req, res, next) => {
    try {
        const { order_no }  = req.body;
        const items = Order_item.findAll({ where: { order_no: order_no }});
        for(i = 0 ; i < items.length; i ++) {
            const quantity = await Book.findOne({ attributes: [book_stock], where: { ISBN: items[i].ISBN } });
            await Book.update({
                book_stock: quantity + items[i].quantity,
                where: { ISBN: items[i].ISBN } 
            })
        };
        await Order.update({
            order_status: '취소'
        }, { where: { order_no: order_no }});
        await Order_item.update({
            quantity: 0
        }, { where: { order_no: order_no }});
        return res.send("<script>alert('주문이 취소되었습니다'); window.location.href='http://localhost:3000/my_page';</script>")
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/order_delete', isLoggedIn, async (req, res, next) => {
    try {
        const { order_no } = req.body;
        await Order.destroy({ where: { order_no: order_no }});
        return res.send("<script>alert('주문이 삭제되었습니다.'); window.location.href='http://localhost:3000/my_page';</script>")
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/refund', isLoggedIn, async (req, res, next) => {
    const { order_no } = req.body;
    return res.render('refund', { order_no : order_no, title: '환불' })
});

router.post('/refund/post', isLoggedIn, async (req, res, next) => {
    const { order_no, refund_reason } = req.body;
    var now = new Date();
    var tomorrow = new Date(now.setDate(now.getDate() + 60*60*24));
    try {
        const order = await Order.findOne({ where: { order_no: order_no } });
        const items = await Order_item.findAll({ where: { order_no: order_no } });
        for(i = 0 ; i < items.length; i ++) {
            const quantity = await Book.findOne({ where: { ISBN: items[i].ISBN } });
            await Book.update({
                book_stock: quantity.book_stock + items[i].quantity,
            }, {where: { ISBN: items[i].ISBN }} )
        };
        if(refund_reason == 'change_mind') {
            await Order.update({
                order_status: '전체반품',
                refund_request_date: Date.now(),
                refund_reason: refund_reason,
                refund_expect_date: Date.now() + 3,
                refund_price: (order.total_price - 5000)
            }, { where: { order_no: order_no }});
        } else {
            await Order.update({
                order_status: '전체반품',
                refund_request_date: Date.now(),
                refund_reason: refund_reason,
                refund_expect_date: tomorrow,
                refund_price: order.total_price
            }, { where: { order_no: order_no }});
        }
        await Order_item.update({
            quantity: 0
        }, { where: { order_no: order_no }});
        return res.send("<script>alert('환불이 신청되었습니다'); window.location.href='http://localhost:3000/my_page';</script>")
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
