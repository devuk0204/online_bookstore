const express = require('express');
const multer = require('multer');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const path = require('path')

const { Book } = require('../models');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, 'uploads/');
      },
      filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
  });
  
router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url: `/img/${req.file.filename}` });
});

router.get(('/'), (req, res, next) => {
        res.render(path.join(__dirname, '../views/book_register.html'));
})

const upload2 = multer();
router.post('/', upload2.none(), async (req, res, next) => {
    console.log(req.body);
    const { ISBN, book_name, book_stock, list_price, category, publish_date, book_writer, publisher } = req.body;
    if(ISBN == "" || book_name == "" || book_stock == "" || publish_date == "" || book_writer == "" || publisher == "") {
        return res.redirect('/book_register?inputError=notInsert');
    }
    else {
        try {
            const exBook = await Book.findOne({ where: { ISBN: ISBN } });
            if (exBook) {
                return res.redirect('/book_register?error=exist');
            }
        console.log(req.user);
        await Book.create({
            ISBN: ISBN,
            img: req.body.url,
            book_name: book_name,
            book_stock: book_stock,
            list_price: list_price,
            category: category,
            publish_date: publish_date,
            book_writer: book_writer,
            publisher: publisher,
        });
        res.redirect('/');
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
});



module.exports = router;