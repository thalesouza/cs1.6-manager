module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define("Match", {
        idmatch: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            autoIncrement: true,
        },
        map: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        max_players: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: 16
        },
        ct_players: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        t_players: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        ct_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        t_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        start_time_match: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        endMatch: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        is_match_finished: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            },
            defaultValue: false
        }
    })
    return Match

}