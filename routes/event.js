const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Book, Event_commercial, Participate_user} = require('../models');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/list/notEnd', async (req, res, next) => {
    try {
        const events = await Event_commercial.findAll({
            where: {
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
        const events = await Event_commercial.findAll({
            where: {
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
    try {
        const reception_no = req.params.reception_no;
        const event = await Event_commercial.findOne({ where: {reception_no: reception_no}});
        res.render('event_page', {title: '이벤트 상세 페이지', event: event});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/', isLoggedIn, async(req, res, next) => {
    try {
        const { reception_no } = req.body;
        const id = req.user.id;
        const event = await Event_commercial.findOne({ where: {reception_no: reception_no }});
        if(event.benefit_apply == 1) {
            await Participate_user.create({
                participate_date: Date.now(),
                benefit_status: 'yet',
                personal_information: 'yes',
                id: id,
                reception_no: event.reception_no,
            });
        } else {
            await Participate_user.create({
                participate_date: Date.now(),
                benefit_status: 'yes',
                personal_information: 'yes',
                id: id,
                reception_no: event.reception_no,
            });
            if(event.exhausted_quantity + 1 >= event.total_quantity) {
                await Event_commercial.update({
                    exhausted_quantity: event.exhausted_quantity + 1,
                    status: 0
                }, { where: {reception_no: event.reception_no}});
            } else {
                await Event_commercial.update({
                    exhausted_quantity: event.exhausted_quantity + 1,
                }, { where: {reception_no: event.reception_no}});
            }
            if(event.benefit_type == 1) {
                user = await User.findOne({ where: {id: id}})
                await User.update({
                    point: user.point + event.benefit
                });
                await Point_log.create({
                    description: '이벤트 참여',
                    total_point: user.point + event.benefit,
                    date: Date.now(),
                    change_point: event.benefit,
                    user_id: id
                });
            }
        }
        res.send("<script>alert('이벤트에 참여하셨습니다.'); window.location.href='http://localhost:3000/';</script>");
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
