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
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        kills: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        deaths: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        mvps: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        ping: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    })

    return Players

}