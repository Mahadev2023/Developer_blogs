var DataTypes = require("sequelize").DataTypes;
var _blogs = require("./blogs");
var _category = require("./category");
var _rating = require("./rating");
var _users = require("./users");

function initModels(sequelize) {
  var blogs = _blogs(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var rating = _rating(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  blogs.belongsToMany(users, { as: 'user_id_users', through: rating, foreignKey: "blog_id", otherKey: "user_id" });
  users.belongsToMany(blogs, { as: 'blog_id_blogs', through: rating, foreignKey: "user_id", otherKey: "blog_id" });
  
  rating.belongsTo(blogs, { as: "blog", foreignKey: "blog_id"});
  blogs.hasMany(rating, { as: "ratings", foreignKey: "blog_id"});
  blogs.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "category_id"});
  blogs.belongsTo(users, { as: "creator_user", foreignKey: "creator"});
  users.hasMany(blogs, { as: "blogs", foreignKey: "creator"});
  rating.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rating, { as: "ratings", foreignKey: "user_id"});

  return {
    blogs,
    category,
    rating,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
