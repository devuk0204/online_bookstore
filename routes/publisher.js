const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');

const { Publisher } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.render(path.join(__dirname, '../views/publisher.html'));
})

router.post('/', async (req, res, next) => {
    const { publisher_name, publisher_address, publisher_contact } = req.body;
    console.log(req.body);
    if(publisher_name == "" || publisher_address == "" || publisher_contact == "") {
        return res.send("<script>alert('필수입력칸을 모두 입력해 주세요,'); history.back()</script>")
    }
    else {
        try {
            const exPublisher = await Publisher.findOne({ where: { publisher_id: publisher_id } });
            if (exPublisher) {
                return res.redirect('/publisher?error=exist');
            }
        console.log(req.user);
        await Publisher.create({
            publisher_name: publisher_name,
            publisher_address: publisher_address,
            publisher_contact: publisher_contact,
        });
        return res.redirect('/');
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
});

module.exports = router;