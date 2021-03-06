const {Match} = require('./Match')
module.exports = (sequelize, DataTypes) => {
    const Players = sequelize.define("Players", {
        idPlayer: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            autoIncrement: true,
        },
        nickname: {
            type: DataTypes.STRING,
            defaultValue: "Unnamed Soldier",
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        kills: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        deaths: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        mvps: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        ping: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        id_match: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })

    // Players.associate = function(models){
    //     Players.belongsTo(models.Match)
    // }


    return Players

}