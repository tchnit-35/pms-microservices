const jwt = require('jsonwebtoken');
exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers["authorization"].split(" ")[1];

    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });
  } else {
    res.json({ success: false, message: 'unauthorized access!' });
  }
}; 

exports.isGuest = async(req, res, next)=> {
  const token = req.headers.authorization;
  if (token) {
    // User is already authenticated, redirect to home page
    res.redirect('/');
  } else {
    // User is a guest, continue to login route
    next();
  }
}