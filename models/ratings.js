const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ratings', {
    rating_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: "ratings_user_id_blog_id_key"
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
        key: 'blog_id'
      },
      unique: "ratings_user_id_blog_id_key"
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ratings',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "ratings_pkey",
        unique: true,
        fields: [
          { name: "rating_id" },
        ]
      },
      {
        name: "ratings_user_id_blog_id_key",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "blog_id" },
        ]
      },
    ]
  });
};
