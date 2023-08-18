const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blogs', {
    blog_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'category',
        key: 'category_id'
      }
    }
  }, {
    sequelize,
    tableName: 'blogs',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "blogs_pkey",
        unique: true,
        fields: [
          { name: "blog_id" },
        ]
      },
    ]
  });
};
