const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const path = require('path');
const User = require('../models/user');
const Shipping_address = require('../models/shipping_address');
const Card = require('../models/card');

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
})
module.exports = router;
