var DataTypes = require("sequelize").DataTypes;
var _blogs = require("./blogs");
var _category = require("./category");
var _comments = require("./comments");
var _rating = require("./rating");
var _users = require("./users");

function initModels(sequelize) {
  var blogs = _blogs(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  //rating table association
  blogs.belongsToMany(users, { as: 'user_id_users', through: comments, foreignKey: "blog_id", otherKey: "user_id" });
  users.belongsToMany(blogs, { as: 'blog_id_blogs_ratings', through: rating, foreignKey: "user_id", otherKey: "blog_id" });
 
  rating.belongsTo(blogs, { as: "blog", foreignKey: "blog_id"});
  blogs.hasMany(rating, { as: "ratings", foreignKey: "blog_id"});

  rating.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rating, { as: "ratings", foreignKey: "user_id"});

 //comment table association
  blogs.belongsToMany(users, { as: 'user_id_users_ratings', through: rating, foreignKey: "blog_id", otherKey: "user_id" });
  users.belongsToMany(blogs, { as: 'blog_id_blogs', through: comments, foreignKey: "user_id", otherKey: "blog_id" });
  

  comments.belongsTo(blogs, { as: "blog", foreignKey: "blog_id"});
  blogs.hasMany(comments, { as: "comments", foreignKey: "blog_id"});

  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});

 //category to blog association
  blogs.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "category_id"});

  //user to blog association
  blogs.belongsTo(users, { as: "creator_user", foreignKey: "creator"});
  users.hasMany(blogs, { as: "blogs", foreignKey: "creator"});
 
 
  return {
    blogs,
    category,
    comments,
    rating,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
