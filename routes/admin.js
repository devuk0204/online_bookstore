const express = require('express');
const bcrypt = require('bcrypt');
const { Publisher, Book, Day_tally, Week_tally, Month_tally, Event_commercial, Event_tally, Participate_user, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', async(req, res) => {
    res.redirect('/admin/event');
});

router.get('/register', async (req, res) => {
    res.render('admin_register', { title: '관리자 등록' });
});

router.post('/register', async (req, res, next) => {
    const { id, admin_pw, name } = req.body;
    try {
        const exAdmin = await User.findOne({ where: { id: id } });
        if (exAdmin) {
            return res.send("<script>alert('이미 존재하는 관리자계정입니다.'); history.back();</script>");
        }
        const hash = await bcrypt.hash(admin_pw, 12);
        await User.create({
            id: id,
            password: hash,
            name: name,
            id_type: 2
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/event', isLoggedIn, async(req, res, next) => {
    if(req.user.id_type == 2) {
        try {
            const events = await Event_commercial.findAll();
            res.render('event_list', { title: '관리자 페이지', events: events});
        } catch(error) {
            console.error(error);
            next(error);
        }
    } else {
        res.send("<script>alert('관리자만 이용 가능합니다.'); history.back();</script>");
    }
});

router.get('/event/reception', isLoggedIn, async(req, res, next) => {
    try{
        const events = await Event_commercial.findAll({
            where: {
                reception_status: '접수'
            }
        });
        res.render('event_reception', {title: '관리자페이지', events: events});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/event/reception', isLoggedIn, async(req, res, next) => {
    try {
        const reception_no = req.body;
        await Event_commercial.update({
            reception_status: '접수완료'
        }, {where: {reception_no: reception_no}});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event/tally/:reception_no', isLoggedIn, async(req, res, next) => {
    const reception_no = req.params.reception_no;
    try {
        const event_tally = await Event_tally.findAll({
            where: {
                reception_no: reception_no
            }
        });
        res.render('event_tally', { title: '관리자 페이지', event_tallies: event_tally });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event/participants/:reception_no', isLoggedIn, async (req, res, next) => {
    const reception_no = req.params.reception_no;
    try {
        const check = await Event_commercial.findOne({
            attributes: [reception_no, title, publisher_name],
            where: {
                reception_no: reception_no
            }
        });
            const participants = await Participate_user.findAll({
                where: {
                    reception_no: reception_no
                }
            });
            res.render('event_participants', { title: '관리자 페이지', participate_users: participants });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event/participants/:reception_no/:id', isLoggedIn, async(req, res, next) => {
    const { reception_no, id } = req.params;
    try {
        const participate = await Participate_user.findOne({
            where: {
                reception_no: reception_no,
                id: id
            }
        });
        res.render('participate_content', { participate: participate });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/event/participants', isLoggedIn, async(req, res, next) => {
    try {
        const { reception_no, id } = req.body;
        await Participate_user.update({
            benefit_status: 'yes',
        }, { where: { reception_no: reception_no, id: id } });
        const event = await Event_commercial.findOne({
            attributes: [total_quantity, exhausted_quantity],
            where: {
                reception_no: reception_no
            }
        });
        if(event.total_quantity <= event.exhausted_quantity) {
            res.send("<script>alert('선정 가능 인원이 꽉찼습니다.'); window.location.href='/event/participants/" + reception_no + "';</script>")
        } else {
            res.send("<script>alert('선정하였습니다.'); window.location.href='/event/participants/" + reception_no + "';</script>");
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event_reception', isLoggedIn, async(req, res, next) => {
    try {
        res.render('/event_reception', {title: '관리자 페이지'})
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/event_reception', isLoggedIn, async(req,res, next) => {
    const { commercial_event_status, post_type, title, content, banner_img, description_img, popup_img, start_date, end_date, drawing_date,
    ISBN, benefit_condition_book, benefit_apply_yn, answer_yn, benefit_type, total_quantity, exhausted_quantity, event_question,
    event_question_answer, policy_no } = req.body;

    const id = req.user.id;

    try {
        await Event_commercial.create({
            reception_date: Date.now(),
            reception_status: '접수완료',
            commercial_event_status: commercial_event_status,
            post_type: post_type,
            title: title,
            content: content,
            banner_img: banner_img,
            description_img: description_img,
            popup_img: popup_img,
            start_date: start_date,
            end_date: end_date,
            drawing_date: drawing_date,
            ISBN: ISBN,
            views: 0,
            status: 0,
            benefit_condition_book: benefit_condition_book,
            benefit_apply_yn: benefit_apply_yn,
            answer_yn: answer_yn,
            benefit_type: benefit_type,
            total_quantity: total_quantity,
            exhausted_quantity: exhausted_quantity,
            event_question: event_question,
            event_question_answer: event_question_answer,
            id: id,
            policy_no: policy_no
        });
        res.send("<script>alert('접수 완료되었습니다.'); window.location.href='http://localhost:3000/admin/event'</script>")

    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;