const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  validateToken: (req, res, next) => {
    const authorizationHeaader = req.headers.authorization;
    let result;
    if (authorizationHeaader) {
      const token = req.headers.authorization.split(" ")[1]; // Bearer <token>
      const options = {
        expiresIn: "12h",
        issuer: "Tristan Jones",
      };
      if (token) {
        try {
          result = jwt.verify(token, process.env.JWT_SECRET, options);
          return result;
        } catch (err) {
          throw new AuthenticationError("Invalid/Expired token");
        }
      } else {
        throw new AuthenticationError(
          "Authentication token must be 'Bearer [token]"
        );
      }
    } else {
      throw new AuthenticationError("Authorization header must be provided");
    }
  },
};
