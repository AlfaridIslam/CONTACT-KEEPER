const jwt = require("jsonwebtoken");


// it will create a token with expiry date w.r.t id
const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:"3d"
    });
}

module.exports = createToken