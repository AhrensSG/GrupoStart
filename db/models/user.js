"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const userInit = (sequelize, DataTypes) => {
    class User extends Model {}
    User.init(
        {
            id: {
                type: DataTypes.TEXT,
                autoIncrement: false,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            surname: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            country: DataTypes.STRING,
            birthday: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "User",
            freezeTableName: true,
        }
    );
    return User;
};

module.exports = userInit(connection, DataTypes);
