"use strict";
const { Model, DataTypes } = require("sequelize");
const connection = require("../index");

const companyInit = (sequelize) => {
    class Company extends Model {}

    Company.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            companyName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            industry: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            buildingNumber: {
                type: DataTypes.STRING, // O INTEGER si es un número
                allowNull: false,
            },
            apartment: {
                type: DataTypes.STRING,
                allowNull: true, // Opcional
            },
            facebookUser: {
                type: DataTypes.STRING,
                allowNull: true, // Opcional
            },
            instagramUser: {
                type: DataTypes.STRING,
                allowNull: true, // Opcional
            },
            tiktokUser: {
                type: DataTypes.STRING,
                allowNull: true, // Opcional
            },
            directCompetitor: {
                type: DataTypes.STRING,
                allowNull: true, // Opcional
            },
            customerAgeRangeMin: {
                type: DataTypes.INTEGER,
                allowNull: true, // Opcional
            },
            customerAgeRangeMax: {
                type: DataTypes.INTEGER,
                allowNull: true, // Opcional
            },
            morningOpeningTime: {
                type: DataTypes.TIME,
                allowNull: true, // Opcional
            },
            morningClosingTime: {
                type: DataTypes.TIME,
                allowNull: true, // Opcional
            },
            afternoonOpeningTime: {
                type: DataTypes.TIME,
                allowNull: true, // Opcional
            },
            afternoonClosingTime: {
                type: DataTypes.TIME,
                allowNull: true, // Opcional
            },
        },
        {
            sequelize,
            modelName: "Company",
            freezeTableName: true,
        }
    );

    return Company;
};

module.exports = companyInit(connection, DataTypes);
