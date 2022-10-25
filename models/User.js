const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [3, 35],
                notNull: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlphanumeric: true,
                len: [8, 20],
                notNull: true
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'user',
    }
)

module.exports = User;