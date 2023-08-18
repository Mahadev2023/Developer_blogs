const {Sequelize}=require("sequelize");
const initModels=require('./models/init-models');


const sequelize=new Sequelize('developer_blogs',"postgres","mahadev",{
    host:'localhost',
    dialect:'postgres',
   
});








async function  check (){
  try {
    initModels(sequelize);
     
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
}

check();

module.exports=sequelize;