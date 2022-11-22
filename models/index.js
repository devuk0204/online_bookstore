const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Card = require('./card');
const Book = require('./book');
const Order = require('./order');
const Order_item = require('./order_item');
const Publisher = require('./publisher');
const Shipping_address = require('./shipping_address');
const Shopping_basket = require('./shopping_basket');
const Basket_item = require('./basket_item');
const Order_status = require('./order_status');
const Point_log = require('./point_log');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Card = Card;
db.Book = Book;
db.Order = Order;
db.Order_item = Order_item;
db.Publisher = Publisher;
db.Shipping_address = Shipping_address;
db.Shopping_basket = Shopping_basket;
db.Basket_item = Basket_item;
db.Order_status = Order_status;
db.Point_log = Point_log;

console.log(db);


User.init(sequelize);
Card.init(sequelize);
Book.init(sequelize);
Order.init(sequelize);
Order_item.init(sequelize);
Publisher.init(sequelize);
Shipping_address.init(sequelize);
Shopping_basket.init(sequelize);
Basket_item.init(sequelize);
Order_status.init(sequelize);
Point_log.init(sequelize);

User.associate(db);
Card.associate(db);
Book.associate(db);
Order.associate(db);
Order_item.associate(db);
Publisher.associate(db);
Shipping_address.associate(db);
Shopping_basket.associate(db);
Basket_item.associate(db);
Order_status.associate(db);
Point_log.associate(db);

module.exports = db;
