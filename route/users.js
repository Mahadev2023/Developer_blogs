const express = require('express');

const { Sequelize, Op } = require('sequelize');

const currentUserRoute = express.Router();

const verifyToken = require('../middleware/authJWT');

const sequelize = require('../db');
const { users: User, blogs: Blog, category: Category } = sequelize.models;

currentUserRoute.use(verifyToken);


//geting blogs of given user user id
currentUserRoute.get('/blog', async (req, res, next) => {
    // const user_id = Number(req.params.user_id);
    const user_id=req.user.user_id;
    try {
        if (NaN == user_id) {
            throw new Error("USER ID NOT VALID");
        }
        const user=await User.findByPk(user_id);
        if (!user) {
            throw new Error("USER With given ID not present");
        }
        const blogs = await Blog.findAll({
            where: {
                creator: user_id
            }
        });
        res.status(200).json({ Message: `user ID:${user_id} blogs`, user_id: user_id, blogs: blogs });
    } catch (error) {
        next(error);
    }
})






//getting blog by id and that creator id
// http://localhost:3000/user/4/blog/12
currentUserRoute.get('/blog/:blog_id', async (req, res, next) => {

    const blog_id = Number(req.params.blog_id);
    // const user_id = Number(req.params.user_id);
    const user_id=req.user.user_id;


    try {
        if (NaN == blog_id) {
            throw new Error("blog ID NOT VALID");
        }
        const blog = await Blog.findByPk(blog_id);


        if (blog === null) {
            const error = new Error("NO SUCH blog HAVING ID " + blog_id);
            error.statusCode = 400;
            throw error;
        }
        if (blog.creator !== user_id) {
            const error = new Error("This blog ID not belong to user ID " + user_id);
            error.statusCode = 400;
            throw error;
        }
        res.status(200).json({ Message: `blog ID:${blog_id} blog details`, blog: blog });
    } catch (error) {
        next(error);
    }
})





//create new blog
// http://localhost:3000/user/1/blog  body=>title content and category_id
currentUserRoute.post('/blog', async (req, res, next) => {
    const creator=req.user.user_id;
    try {
        const { title, content, category_id } = req.body;

        const userValid = await User.findByPk(creator);
        if (!userValid) {
            throw new Error("USER ID NOT VALID");
        }
        const categoryValid = await Category.findByPk(category_id);
        if (!categoryValid) {
            throw new Error("CAREGORY_ID IS NOT VALID");
        }

        const newblog = await  Blog.create({
            title,
            content,
            creator,
            category_id
        })

        res.status(201).json({ blogId: newblog.blog_id, Details: newblog });
    } catch (error) {
        next(error);
    }
})


// http://localhost:3000/user/3/blog/9
// {
//     "update":{
//           "title":"IOTa NEW this ",
//           "content":"new  d aad Contentd update"
//     }
//   }


//update blog
currentUserRoute.put('/blog/:blog_id', async (req, res, next) => {
    // const current_user_id = Number(req.params.user_id);
    const current_user_id=req.user.user_id;
    const blog_id = Number(req.params.blog_id);
    let { update } = req.body;
    const category_id = Number(update?.category_id) || null;
    try {
        const validblog = await Blog.findByPk(blog_id);
        if (!validblog) {
            throw new Error("blog ID NOT VALID");
        }
        //here check blog that user current login/(send req) that have created that blog
        // console.log(typeof validblog.creator);
        if (validblog.creator !== current_user_id) {
            const error = new Error("YOU ARE NOT ALLOW TO UPDATE blog");
            error.statusCode = 403;
            throw error;
        }
        const title = update.title;
        const content = update.content;

        const rowUpdated = await  Blog.update({ title, content }, {
            where: {
                blog_id: blog_id
            },
            returning: true,
        });
        //above is returning is in bloggres   returning: true, plain: true 


        res.status(201).json({ status: "blog updated successfuly", rowUpdated });
    } catch (error) {
        next(error);
    }
})




//delete blog
//delete the blog whom created
currentUserRoute.delete('/blog/:blog_id', async (req, res, next) => {
    // const current_user_id = Number(req.params.user_id);
    const current_user_id=req.user.user_id;
    const blog_id = Number(req.params.blog_id);
    try {
        const validblog = await  Blog.findByPk(blog_id);
        if (!validblog) {
            throw new Error("blog ID NOT VALID");
        }
        //here check blog that user current login/(send req) that have created that blog
        console.log(typeof validblog.creator);
        if (validblog.creator !== current_user_id) {
            const error = new Error("YOU ARE NOT ALLOW TO DELETE blog");
            error.statusCode = 403;
            throw error;
        }



        const deleted = await  Blog.destroy({
            where: {
                blog_id: blog_id,
                creator: current_user_id
            },
            returning:true
        });

        res.status(201).json({ status: "blog Deleted successfuly", deleted });
    } catch (error) {
        next(error);
    }
})





// // "username": "Abhi",
// // "email": "abhi@gmail.com",
// // "password": "abhi1234"

// // "user_id": 4,
// // "username": "mahadev5",
// // "email": "mahadev5@gmail.com",
// // "password": "mahadev5"



module.exports = currentUserRoute;







