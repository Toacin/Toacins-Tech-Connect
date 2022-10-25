const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {};

Comment.init(
    {
        comment_content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: true,
            references: {
                model: "user",
                key: "id"
            }
        },
        post_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: "post",
                key: "id"
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: false,
        modelName: 'comment'
    }
)

module.exports = Comment;