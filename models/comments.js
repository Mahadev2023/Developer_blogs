const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    comment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: "comments_comment_id_user_id_blog_id_key"
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      unique: "comments_comment_id_user_id_blog_id_key"
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'blogs',
        key: 'blog_id'
      },
      unique: "comments_comment_id_user_id_blog_id_key"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'comments',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comments_comment_id_user_id_blog_id_key",
        unique: true,
        fields: [
          { name: "comment_id" },
          { name: "user_id" },
          { name: "blog_id" },
        ]
      },
      {
        name: "comments_pkey",
        unique: true,
        fields: [
          { name: "comment_id" },
        ]
      },
    ]
  });
};
