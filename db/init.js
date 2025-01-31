const connection = require("./index");
const { User, Order, OrderProducts } = require("./models/models");

(async () => {
    try {
        await connection.sync({ alter: true });
        console.log("Base de datos sincronizada");
    } catch (error) {}
})();

module.exports = {
    User,
    Order,
    OrderProducts,
};
