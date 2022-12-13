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
const Day_tally = require('./day_tally');
const Month_tally = require('./month_tally');
const Week_tally = require('./week_tally');
const Sales_revenue = require('./sales_revenue');
const Admin_post = require('./admin_post');

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
db.Day_tally = Day_tally;
db.Week_tally = Week_tally;
db.Month_tally = Month_tally;
db.Sales_revenue = Sales_revenue;
db.Admin_post = Admin_post;

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
Day_tally.init(sequelize);
Week_tally.init(sequelize);
Month_tally.init(sequelize);
Sales_revenue.init(sequelize);
Admin_post.init(sequelize);

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
Day_tally.associate(db);
Week_tally.associate(db);
Month_tally.associate(db);
Sales_revenue.associate(db);
Admin_post.associate(db);

module.exports = db;
