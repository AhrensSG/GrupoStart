"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const orderInit = (sequelize, DataTypes) => {
  class Order extends Model {}
  Order.init(
    {
      orderId: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      status: DataTypes.ENUM("Shopping", "Pending", "Paid", "Cancel"),
      totalPrice: DataTypes.DECIMAL(10, 2),
      deliveryCost: DataTypes.DECIMAL(10, 2),
      cartPrice: DataTypes.DECIMAL(10, 2),
      delivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      email: DataTypes.TEXT,
      name: DataTypes.STRING,
      surname: DataTypes.STRING,

      postalCode: DataTypes.STRING,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      fullAddress: DataTypes.TEXT,

      phone: DataTypes.BIGINT,
      trackingId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      freezeTableName: true,
    }
  );
  return Order;
};

module.exports = orderInit(connection, DataTypes);
