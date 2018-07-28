module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "app",
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
        shortDescription: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        longDescription: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        tweets: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true
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