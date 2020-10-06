module.exports = (req, res, next) => {
  const user = req.user.validUser;
  if (user.role === "admin"){
    next();
  } else if (user.role === "user"){
    if (req.params.userId.localeCompare(user._id) === 0){
      next();
    } else {
      res.status(403).send({ msg: "forbidden !!" });
    }
  }
};
