const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('category', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "category_name_key"
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "category_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "category_pkey",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
      {
        name: "name",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
    ]
  });
};
