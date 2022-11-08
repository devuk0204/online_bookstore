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
        return res.render('main', {
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

router.post('/page', async (req, res, next) => {
    const { ISBN } = req.body;
    try {
        const book = await Book.findOne({
            where: {
                ISBN: ISBN
            }
        });
        return res.render('book', {
            book: book
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;