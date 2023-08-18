const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rating', {
    rating_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "rating_rating_id_key"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'blogs',
        key: 'blog_id'
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'rating',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rating_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "blog_id" },
        ]
      },
      {
        name: "rating_rating_id_key",
        unique: true,
        fields: [
          { name: "rating_id" },
        ]
      },
    ]
  });
};
