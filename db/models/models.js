const connection = require("../index.js");
const Order = require("./order");
const OrderProducts = require("./orderProducts");
const User = require("./user");

(async () => {
  try {
    User.hasMany(Order);
    Order.belongsTo(User);
    await connection.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = {
  User,
  Order,
  OrderProducts,
};
