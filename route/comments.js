const commentRoute = require('express').Router();

const { Sequelize }=require('sequelize');
const sequelize = require('../db');

const verifyToken = require('../middleware/authJWT');


const {
    blogs: Blog,
    category: Category,
    comments: Comment,
    ratings: Rating,
    users: User,
} = sequelize.models;

commentRoute.use(verifyToken);

//getting all comments
commentRoute.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.findAll();
        res.status(200).json({ Message: "All Blogs comment", comments: comments });
    } catch (error) {
        next(error);
    }
})



//comment by id
commentRoute.get('/:comment_id', (req, res, next) => {
    const comment_id = Number(req.params.comment_id);
    if (comment_id === NaN) {
        next(new Error("COMMENT ID IS NOT VALID"));
    }

    

    Comment.findByPk(comment_id)
        .then((comment) => {
            res.status(200).json(
                {
                    Message: 'comment for given comment id',
                    Detail:comment
                })
        })
        .catch((error)=>{
            next(error);
        })
})

//for above to comment
//as this verifyToken middleware is below the /comment get route(above) so 
//to fetch about route there is no need of any authentication
// commentRoute.use(verifyToken);


//add new comment
commentRoute.post('/',async(req,res,next)=>{
    const {blog_id,content}=req.body;
    const user_id=req.user.user_id;
    try{
        if(!(user_id && blog_id && content)){
            throw new Error("user_id , blog_id and comment values needed");
        }
        const validUser=await User.findByPk(user_id);
        if(validUser==null){
            throw new Error("No user_id is not found")
        }

        const validBlog=await Blog.findByPk(blog_id);
        if(validBlog==null){
            throw new Error("No blog_id  is not found")
        }

        const newcomment=await Comment.create({
            user_id,
            blog_id,
            content
        });

        res.status(201).json({
            Message:"comment is Success",
            Detail:newcomment
        })

    }catch(error){
        next(error)
    }
})


//edit old comment
commentRoute.put('/:comment_id',async(req,res,next)=>{
    const {content}=req.body;
    const user_id=req.user.user_id;
    const comment_id=Number(req.params.comment_id);
    try{
        if(comment_id===NaN){
            throw new Error("comment ID is not valid in params")
        }
      
        if(!(content)){
            throw new Error("values needed");
        }
        

        const commentInstance=await Comment.findByPk(comment_id);
        console.log(commentInstance);
        if(!commentInstance){
            throw new Error("No such comment_id")
        }
        if(commentInstance.user_id!==user_id){
            throw new Error("this is not your comment")
        }

        commentInstance.content=content;
        await commentInstance.save();
       
    
        res.status(200).json({
            Message:"comment Updated",
            "Update comment":commentInstance
        })

    }catch(error){
        next(error)
    }
});


//delete the comment
commentRoute.delete('/',async(req,res,next)=>{
    const {comment_id}=req.body;
    const user_id=req.user.user_id;

    try{
        if(!(comment_id)){
            throw new Error("comment_id required");
        }
        const commentToDelete=await Comment.findByPk(comment_id);
        if(commentToDelete===null){
            throw new Error("comment Record with this id not find please check comment id")
        }
        if(commentToDelete.user_id!==user_id){
            throw new Error("you are not allow to delete this comment")
        }
       const result=await commentToDelete.destroy({
        returning: true,
       });

       res.status(200).json({Message:"Your comment is deleted"});

    }catch(error){
        next(error);
    }
})


module.exports = commentRoute;