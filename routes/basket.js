const express = require('express');
const { isLoggedIn } = require('./middlewares');
const { Book, Basket_item, Shopping_basket, Order, Card, Shipping_address, Order_item } = require('../models');
const router = express.Router();

router.get('/', isLoggedIn , async (req, res, next) => {
    const id = req.user.id;
    try {
        const basket = await Shopping_basket.findOne({
            where: {
                user_id: id
            }
        });
        if(basket) {
            const items = await Basket_item.findAll({
                where: {
                        basket_no: basket.basket_no
                }
            });
            return await res.render('basket', {
                basket_no: basket.basket_no,
                items: items
            });
        }
        else {
            return await res.render('basket');
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async (req, res, next) => {
    const { ISBN, quantity } = req.body;
    const id = req.user.id;
    try {
        await Shopping_basket.create({
            user_id: id,
        });
        const basket = await Shopping_basket.findOne({
            where: {
                user_id: id
            }
        });
        const exItem = await Basket_item.findOne({
            where: {
                basket_no: basket.id,
                ISBN: ISBN
            }
        });
        if(exItem) {
            return res.send('<script>alert("이미 장바구니에 있는 책입니다."); history.back();</script>')
        }
        else {
            await Basket_item.create({
                basket_no: basket.id,
                ISBN: ISBN,
                quantity: quantity
            });
            return res.render('main');
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
    
});

router.post('/delete', isLoggedIn, async (req, res, next) => {
    const { item_id } = req.body;
    try {
        await Basket_item.destroy({
            where: {
                id: item_id
            }
        });
        return res.render('basket');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/order', isLoggedIn, async (req, res, next) => {
    const { basket_no, card_no, address_no } = req.body;
    const id = req.user.id;
    if(!card_no && !address_no) {
        return res.send("<script>alert('마이페이지에서 카드정보와 주소정보를 먼저 입력해주세요.'); history.back();</script>");
    }
    else {
        let total_price = 0;
        const card = await Card.findOne({
            where: {
                card_no: card_no,
                user_id: id
            }
        });
        const address = await Shipping_address.findOne({
            where: {
                shipping_address_no: address_no
            }
        });
        await Order.create({
            card_no: card.card_no,
            card_expiry_date: card.card_expiry_date,
            card_type: card.card_type,
            postal_code: address.postal_code,
            address1: address.address1,
            address2: address.address2,
            total_price: 0,
            user_id: id
        });
        const orders = await Order.findAll({
            where: {
                user_id: id,
            }
        });
        const order = orders[orders.length - 1];
        const items = await Basket_item.findAll({
            where: {
                basket_no: basket_no
            }
        });
        console.log(items[0].quantity);
        for(i = 0; i < items.length; i++  ) {
            const book = await Book.findOne({
                where: {
                    ISBN: items[i].ISBN
                }
            });
            total_price += book.list_price * items[i].quantity;
            await Order_item.create({
                order_no: order.id,
                ISBN: book.ISBN,
                sell_price: book.list_price,
                quantity: items[i].quantity
            });
        };
        await Order.update({
            total_price: total_price,
        }, {
            where: {
                id: order.id
            }
        });
        return await res.redirect('/');
    };
    
});

module.exports = router;