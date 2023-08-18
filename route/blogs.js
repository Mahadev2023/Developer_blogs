const express = require('express');

const { Sequelize, Op } = require('sequelize');

const blogRoute = express.Router();


const sequelize = require('../db');
const { users: User, blogs: Blog, category: Category } = sequelize.models;



//getting all blog  http://localhost:3000/blogs
blogRoute.get('/', async (req, res, next) => {

    try {
      
         console.log(new Date().toLocaleTimeString())
        const allblogs = await Blog.findAll();
        
        if (allblogs.length === 0) {
            const error = new Error("BLOGS ARE NOT PRESENT");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ Message: "AVAILABLE BLOGS ", "blogs": allblogs });
    } catch (error) {
        next(error);
    }
})


blogRoute.get('/:blog_id', async (req, res, next) => {
    const blog_id=Number(req.params.blog_id);
    try {
        if(blog_id===NaN) {
            throw new Error("BLOG ID IS NOT VALID");
        }
        const blog= await Blog.findByPk(blog_id);

        if (blog===null) {
            const error = new Error("BLOG IS NOT PRESENT WITH GIVEN BLOG ID");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ "blog":blog });
    } catch (error) {
        next(error);
    }
})




//getting all blog  http://localhost:3000/blogs by filter
blogRoute.post('/', async (req, res, next) => {

    try {
        const category_name = req.body.category_name || (await Category.findAll()).map(cat => cat?.name);
        let { where } = req.body;

        // const category=await Category.findOne({where:{
        //     "name":category_name
        // }})
        // const blogs=await category.getblogs();
        // res.json(blogs)
       console.log(where);
        const allblogs = await Blog.findAll({
            where: {
                ...where
            },
            include: {
                model: Category,
                as: "category",
                where: {
                    name: category_name
                }
            }
        });
        if (allblogs.length === 0) {
            const error = new Error("Record Not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({ Message: "Blogs fetch ", "blogs": allblogs });
    } catch (error) {
        next(error);
    }
})


module.exports=blogRoute ;