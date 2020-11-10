const superagent = require("superagent");

const Users = require("../../users/model/userModel.js");
const users = require("../../users/model/userSchema.js");

module.exports = async function (req, res, next) {
  try {
    const remoteToken = req.query.token;
    
  
    const remoteUser = await getRemoteUserInfo(remoteToken);
  
    const [user, token] = await getUser(remoteUser);
    req.token = token;
    req.user = user;
  
    next();
  } catch (e) {
    next(`ERROR: ${e.message}`);
  }
};

// this will use the user api endpoint to get user info/repo info
async function getRemoteUserInfo(token) {
  // this will use the access token to get user details
  const userResponse = await superagent.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
    .set("user-agent", "express-app")
    .set("Authorization", `token ${token}`);
  
  const user = userResponse.body;
  return user;
}
  
async function getUser(remoteUser) {
  const record = {
    username: remoteUser.email,
    password: "oauthpassword",
    // email: remoteUser.email,
    // image: remoteUser.picture,
  };
  
  let userRecord = new users(record);

  userRecord = {
    role: userRecord.role,
    username: userRecord.username,
    password: userRecord.password,
    // email: userRecord.email,
    // image: userRecord.image,
  };
  // let user = await userRecord.save();

  // eslint-disable-next-line no-unused-vars
  let mighterr = await users.updateOne(
    { username: remoteUser.username },
    { $set: userRecord },
    { upsert: true }, // If set to true, creates a new document when no document matches the query criteria
  );

  let user = await users.findOne({ username: remoteUser.email });
  let token = await Users.generateToken(user);
  return [user, token];
}
  