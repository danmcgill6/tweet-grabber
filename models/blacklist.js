module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "blacklist",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        appName:{
          type: DataTypes.STRING,
          allowNull: false
        },
        updated_at: {
          type: DataTypes.DATE,
          defaultValue: new Date(),
          allowNull: false
        },
        deleted_at: {
          type: DataTypes.DATE
        }
      },
      {
        paranoid: true,
        underscored: true
      }
    );
  };