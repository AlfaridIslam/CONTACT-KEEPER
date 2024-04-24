const jwt = require("jsonwebtoken");

// it will create a token with expiry date w.r.t id
const createToken = (payload) => {
  return jwt.sign(Object.assign({},payload) , process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

module.exports = createToken;
