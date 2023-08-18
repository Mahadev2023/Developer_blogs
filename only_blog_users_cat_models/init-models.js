var DataTypes = require("sequelize").DataTypes;
var _blogs = require("./blogs");
var _category = require("./category");
var _users = require("./users");

function initModels(sequelize) {
  var blogs = _blogs(sequelize, DataTypes);
  var category = _category(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  blogs.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(blogs, { as: "blogs", foreignKey: "category_id"});
  blogs.belongsTo(users, { as: "creator_user", foreignKey: "creator"});
  users.hasMany(blogs, { as: "blogs", foreignKey: "creator"});

  return {
    blogs,
    category,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
