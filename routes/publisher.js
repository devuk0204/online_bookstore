const express = require('express');
const path = require('path')

const { Publisher } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
    res.render(path.join(__dirname, '../views/publisher.html'));
})

router.post('/', async (req, res, next) => {
    const { publisher_name, publisher_address, publisher_contact } = req.body;
    console.log(req.body);
    if(publisher_name == "" || publisher_address == "" || publisher_contact == "") {
        return res.redirect('/publisher?inputError=notInsert');
    }
    else {
        try {
            const exPublisher = await Publisher.findOne({ where: { publisher_name: publisher_name } });
            if (exPublisher) {
                return res.redirect('/publisher?error=exist');
            }
        console.log(req.user);
        await Publisher.create({
            publisher_name: publisher_name,
            publisher_address: publisher_address,
            publisher_contact: publisher_contact
        });
        return res.redirect('/');
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
});

module.exports = router;