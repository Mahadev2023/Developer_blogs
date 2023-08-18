const ratingRoute = require('express').Router();

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



ratingRoute.post('/avg', async (req, res, next) => {
    try {
        const ratings = await Rating.findAll({
            attributes: [["blog_id","blog_id"],
                [Sequelize.fn('ROUND',(Sequelize.fn('AVG', Sequelize.col('rating'))),2), 'avg_rating'],
              ],
            where:req.body?.where,
            order:req.body?.order,
            group:"blog_id"
            
        });
        res.status(200).json({ Message: "All Blogs Rating", Ratings: ratings });
    } catch (error) {
        next(error);
    }
})


///

//getting all ratings
ratingRoute.get('/', async (req, res, next) => {
    try {
        const ratings = await Rating.findAll({
            where:req.body.where
        });
        res.status(200).json({ Message: "All Blogs Rating", Ratings: ratings });
    } catch (error) {
        next(error);
    }
})

ratingRoute.use(verifyToken);


//rating by id
ratingRoute.get('/:rating_id', (req, res, next) => {
    const rating_id = Number(req.params.rating_id);
    if (rating_id === NaN) {
        next(new Error("Rating ID IS NOT VALID"));
    }

    

    Rating.findByPk(rating_id)
        .then((rating) => {
            res.status(200).json(
                {
                    Message: 'Rating for given rating id',
                    Detail:rating
                })
        })
        .catch((error)=>{
            next(error);
        })
})

//for above to rating
//as this verifyToken middleware is below the /rating get route(above) so 
//to fetch about route there is no need of any authentication


//add new rating
ratingRoute.post('/',async(req,res,next)=>{
    const {blog_id,rating}=req.body;
    const user_id=req.user.user_id;
    try{
        if(!(user_id && blog_id && rating)){
            throw new Error("user_id , blog_id and rating values needed");
        }
        const validUser=await User.findByPk(user_id);
        if(validUser==null){
            throw new Error("No user_id is not found")
        }

        const validBlog=await Blog.findByPk(blog_id);
        if(validBlog==null){
            throw new Error("No blog_id  is not found")
        }

        const checkUserPost=await Rating.findOne({where:{
            user_id,
            blog_id
        }})
        if(checkUserPost){
            throw new Error("you have already put rating for this post you can edit it")
        }

        const newRating=await Rating.create({
            user_id,
            blog_id,
            rating
        });

        res.status(201).json({
            Message:"Rating is Success",
            Detail:newRating
        })

    }catch(error){
        next(error)
    }
})


//edit old rating
ratingRoute.put('/:rating_id',async(req,res,next)=>{
    const {rating}=req.body;
    const user_id=req.user.user_id;
    const rating_id=Number(req.params.rating_id);
    try{
        if(rating_id===NaN){
            throw new Error("Rating ID is not valid in params")
        }
      
        if(!(rating)){
            throw new Error("values needed");
        }
        

        const ratingInstance=await Rating.findByPk(rating_id);
        console.log(ratingInstance);
        if(!ratingInstance){
            throw new Error("No such rating_id")
        }
        if(ratingInstance.user_id!==user_id){
            throw new Error("this is not your rating")
        }

        ratingInstance.rating=rating;
        await ratingInstance.save();
    
        res.status(200).json({
            Message:"Rating Updated",
            "Update Rating":ratingInstance
        })

    }catch(error){
        next(error)
    }
});


//delete the rating
ratingRoute.delete('/',async(req,res,next)=>{
    const {rating_id}=req.body;
    const user_id=req.user.user_id;

    try{
        if(!(rating_id)){
            throw new Error("rating_id required");
        }
        const ratingToDelete=await Rating.findByPk(rating_id);
        if(ratingToDelete===null){
            throw new Error("Rating Record with this id not find please check rating id")
        }
        if(ratingToDelete.user_id!==user_id){
            throw new Error("you are not allow to delete this rating")
        }
       const result=await ratingToDelete.destroy({
        returning: true,
       });

       res.status(200).json({Message:"Your Rating is deleted"});

    }catch(error){
        next(error);
    }
})


module.exports = ratingRoute;