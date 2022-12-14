const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Book, Event_commercial} = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/list/notEnd', async (req, res, next) => {
    try {
        const date = new Date();
        const events = await Event_commercial.findAll({
            where: {
                start_date: {
                    [Op.lte]: date
                },
                end_date: {
                    [Op.gte]: date
                },
                status: 1
            }
        });
        console.log(events);
        res.render('event', {title: '이벤트 리스트(진행중)', events: events});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/list/end', async (req, res, next) => {
    try {
        const date = new Date();
        const events = await Event_commercial.findAll({
            where: {
                end_date: {
                    [Op.lte]: date
                },
                status: 0
            }
        });
        console.log(events);
        res.render('event', {title: '이벤트 리스트(종료)', events: events});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/:reception_no', async (req, res, next) => {
    const reception_no = req.params.reception_no;
    try {
        const event = await Event_commercial.findOne({ where: reception_no});
        res.render('event_page', {title: '이벤트 상세 페이지', event: event});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// router.post('/', async(req, res, next) => {

// });

module.exports = router;
