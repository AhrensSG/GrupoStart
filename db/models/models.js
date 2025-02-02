const connection = require("../index.js");
const Order = require("./order");
const OrderProducts = require("./orderProducts");
const User = require("./user");
const Company = require("./company");

(async () => {
    try {
        // Relación uno a muchos entre User y Order
        User.hasMany(Order);
        Order.belongsTo(User);

        // Relación uno a muchos entre Order y OrderProducts
        Order.hasMany(OrderProducts);
        OrderProducts.belongsTo(Order);

        // Relación uno a uno entre User y Company
        // Cambiar a hasMany si un usuario puede tener múltiples empresas
        User.hasOne(Company); // O: User.hasMany(Company);
        Company.belongsTo(User);

        // Sincronización de la base de datos
        await connection.sync({ alter: true });
        console.log("Base de datos sincronizada");
    } catch (error) {
        console.log(error);
    }
})();

module.exports = {
    User,
    Order,
    OrderProducts,
    Company,
};
