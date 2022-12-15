const express = require('express');
const { Publisher, Book, Day_tally, Week_tally, Month_tally, Event_commercial, Event_tally, Participate_user, Commercial_policy, User } = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/', async(req, res) => {
    res.redirect('/book');
});

router.get('/register', async (req, res) => {
    res.render('publisher_register', { title: '출판사 등록' });
});

router.post('/register', async (req, res, next) => {
    const { publisher_name, publisher_address, publisher_contact, publisher_id, publisher_pw } = req.body;
    console.log(req.body);
    if(publisher_name == "" || publisher_address == "" || publisher_contact == "") {
        return res.send("<script>alert('필수입력칸을 모두 입력해 주세요,'); history.back()</script>")
    }
    else {
        try {
            const exPublisher = await Publisher.findOne({ where: { publisher_name: publisher_name } });
            if (exPublisher) {
                return res.send("<script>alert('이미 존재하는 출판사입니다.'); history.back();</script>");
            }
        await Publisher.create({
            publisher_name: publisher_name,
            publisher_address: publisher_address,
            publisher_contact: publisher_contact,
        });
        const hash = await bcrypt.hash(publisher_pw, 12);
        await User.create({
            id: publisher_id,
            password: hash,
            name: publisher_name,
            id_type: 3,
        });
        return res.redirect('/');
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
});

router.get('/book', isLoggedIn, async (req, res) => {
    if(req.user.id_type == 3) {
        const name = req.user.name;
        try {
            const books = await Book.findAll({ 
                where: {
                    publisher_name: name,
                }
            });
            res.render('publisher_book', { title: '출판사 페이지' , books: books});
        } catch(error) {
            console.error(error);
            next(error);
        }
    } else {
        res.send("<script>alert('출판사만 이용 가능합니다.'); history.back();</script>");
    } 
});

router.get('/book/:ISBN', isLoggedIn, async (req, res, next) => {
    const ISBN = req.params.ISBN;
    const name = req.user.name;
    try {
        const check = Book.findOne({
            attributes: [publisher_name],
            where: {
                ISBN: ISBN
            }
        });
        if(check.publisher_name == name) {
            const day_tally = Day_tally.findAll({
                limit: 30,
                where: {
                    ISBN: ISBN
                }
            });
            const week_tally = Week_tally.findAll({
                limit: 15,
                where: {
                    ISBN: ISBN
                }
            });
            const month_tally = Month_tally.findAll({
                limit: 12,
                where: {
                    ISBN: ISBN
                }
            });
            res.render('book_tally', { title: '출판사 페이지', day_tallies: day_tally, week_tallies: week_tally, month_tallies: month_tally });
        } else {
            res.send("<script>alert('해당 도서를 출판한 출판사만 이용 가능합니다.'); history.back();</script>");
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event', isLoggedIn, async(req, res, next) => {
    if(req.user.id_type == 3) {
        const name = req.user.name;
        try {
            const events = await Event_commercial.findAll({
                where: {
                    publisher_name: name,
                }
            });
            res.render('event_list_p', { title: '출판사 페이지', events: events });
        } catch(error) {
            console.error(error);
            next(error);
        }
    } else {
        res.send("<script>alert('출판사만 이용 가능합니다.'); history.back();</script>");
    }
});

router.get('/event/tally/:reception_no', isLoggedIn, async(req, res, next) => {
    const reception_no = req.params.reception_no;
    const name = req.user.name;
    try {
        const check = await Event_commercial.findOne({
            where: {
                reception_no: reception_no
            }
        });
        if(check.publisher_name == name) {
            const event_tally = await Event_tally.findAll({
                where: {
                    reception_no: reception_no
                }
            });
            res.render('event_tally', { title: '출판사 페이지', event_tallies: event_tally, reception_no: reception_no });
        } else {
            res.send("<script>alert('해당 도서를 출판한 출판사만 이용 가능합니다.'); history.back();</script>");
        }
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/event/participants/:reception_no', isLoggedIn, async (req, res, next) => {
    const reception_no = req.params.reception_no;
    const name = req.user.name;
    try {
        const check = await Event_commercial.findOne({
            where: {
                reception_no: reception_no
            }
        });
        if(check.publisher_name == name) {
            const participants = await Participate_user.findAll({
                where: {
                    reception_no: reception_no
                }
            });
            res.render('event_user_list_p', { title: '출판사 페이지', participants: participants });
        } else {
            res.send("<script>alert('해당 도서를 출판한 출판사만 이용 가능합니다.'); history.back();</script>");
        }
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
        res.render('event_reception_p', {title: '출판사 페이지'})
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/event_reception', isLoggedIn, async(req,res, next) => {
    const { commercial_event_status, post_type, title, content, banner_img, description_img, popup_img, start_date, end_date, drawing_date,
    ISBN, benefit_condition_book, benefit_apply_yn, answer_yn, benefit_type, total_quantity, exhausted_quantity, event_question,
    event_question_answer, policy_no } = req.body;
    
    const name = req.user.name;

    try {
        await Event_commercial.create({
            reception_date: Date.now(),
            reception_status: '접수',
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
            publisher_name: name,
            policy_no: policy_no
        });
        res.send("<script>alert('접수 완료되었습니다.'); window.location.href='http://localhost:3000/publisher/event'</script>")

    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;