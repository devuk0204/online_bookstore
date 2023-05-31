const { Op } = require('sequelize');
const express = require('express');

const { Book } = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { book_name } = req.body;
    try {
        const books = await Book.findAll({
            where: {
                book_name: {
                    [Op.like]: `%${book_name}%`
                }
            }
        });
        return res.render('search', {
            books: books
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.post('/delete', async (req, res, next) => {
    const { ISBN } = req.body;
    try {
        const books = await Book.destroy({
            where: {
                ISBN: ISBN
            }
        });
        return res.redirect('/');
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/page/:ISBN/:event', async (req, res, next) => {
    const { ISBN, event } = req.params;
    try {
        const book = await Book.findOne({
            where: {
                ISBN: ISBN
            }
        });
        return res.render('book', { title: '도서상세정보',book: book, event: event});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;