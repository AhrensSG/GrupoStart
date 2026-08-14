const Order = require("./order");
const OrderProducts = require("./orderProducts");
const User = require("./user");
const Company = require("./company");

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

// Nota: el esquema de la base de datos se gestiona con migraciones versionadas
// (npm run migrate, ver db/migrations). No se usa connection.sync().

module.exports = {
    User,
    Order,
    OrderProducts,
    Company,
};
