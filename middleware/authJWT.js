const jwt = require("jsonwebtoken");


const sequelize = require('../db');
const { users: User, posts: Post, category: Category } = sequelize.models;


function verifyToken(req, res, next) {
    console.log(req?.headers?.authorization);
    const inAuth=req?.headers?.authorization?.split(' ');
    console.log(inAuth);
    if (req?.headers?.authorization && inAuth[0]=== 'JWT') {
        jwt.verify(inAuth[1], process.env.API_SECRET, async (err, decode) => {
            if (err) {
                // console.log('error in verify time',err);
                req.user = undefined;
                next(err);

            }
            try {
                const user = await User.findByPk(decode.user_id);
                req.user = user;
                console.log(req.user.toJSON());
                next();
            } catch (error) {
                next(error);
            }
        });

    } else {
        req.user = undefined;
        next(new Error("authorization field not found"))
    }
}

module.exports= verifyToken;