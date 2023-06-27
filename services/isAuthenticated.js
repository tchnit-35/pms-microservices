const jwt = require('jsonwebtoken');
const User = require('./auth-service/User')
exports.isAuth = async (req, res, next) => {
  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = jwt.verify(token,"secret")
      const user = await User.findById(decode.userId)
      if (!user) {
        return res.json({ success: false, message: 'unauthorized access!' })
      }
      req.user = user
      next()
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.json({ success: false, message: 'unauthorized access!' });
      }
      if (error.name === 'TokenExpiredError') {
        return res.json({
          success: false,
          message: 'session expired try sign in!',
        });
      }
      res.status(401).json({success: false, message:'Vos mamans'});
    }
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