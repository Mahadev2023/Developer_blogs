var DataTypes = require("sequelize").DataTypes;
var _blogs = require("./blogs");
var _category = require("./category");
var _comments = require("./comments");
var _ratings = require("./ratings");
var _users = require("./users");

function initModels(sequelize) {
  var blogs = _blogs(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var comments = _comments(sequelize, DataTypes);
  var ratings = _ratings(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  //comment association 
  comments.belongsTo(blogs, { as: "blog", foreignKey: "blog_id"});
  blogs.hasMany(comments, { as: "comments", foreignKey: "blog_id"});
  comments.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(comments, { as: "comments", foreignKey: "user_id"});

 //rating association
  ratings.belongsTo(blogs, { as: "blog", foreignKey: "blog_id"});
  blogs.hasMany(ratings, { as: "ratings", foreignKey: "blog_id"});
  ratings.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(ratings, { as: "ratings", foreignKey: "user_id"});

  //category association
  blogs.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "category_id"});
  
  //user association
  blogs.belongsTo(users, { as: "creator_user", foreignKey: "creator"});
  users.hasMany(blogs, { as: "blogs", foreignKey: "creator"});
  
  return {
    blogs,
    category,
    comments,
    ratings,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
