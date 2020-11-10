const superagent = require("superagent");

const Users = require("../../users/model/userModel.js");
const users = require("../../users/model/userSchema.js");

module.exports = async function (req, res, next) {
  try {
    const remoteToken = req.query.token;
    
    // let code = req.query.code;
    // console.log("(1) CODE:", code);
  
    // const remoteToken = await exchangeCodeForToken(code);
    // console.log("(2) ACCESS TOKEN:", remoteToken);
  
    const remoteUser = await getRemoteUserInfo(remoteToken);
    console.log("(3) GOOGLE USER", remoteUser);
  
    const [user, token] = await getUser(remoteUser);
    console.log("++++++++++++++++++++++++++++++++++++");
    console.log(user);
    console.log(token);
    console.log("++++++++++++++++++++++++++++++++++++");
    req.token = token;
    req.user = user;
  
    console.log("(4) LOCAL USER", user);
    next();
  } catch (e) {
    next(`ERROR: ${e.message}`);
  }
};
/*
// this will use the access_token github api endpoint
async function exchangeCodeForToken(code) {
  const tokenResponse = await superagent.post("https://www.googleapis.com/oauth2/v4/token")
    .send({
      code: code,
      client_id: CLIENT_ID2,
      client_secret: CLIENT_SECRET2,
      redirect_uri: API_SERVER,
      grant_type: "authorization_code",
    });
  console.log("exchangeCodeForToken Out");
  
  console.log("tokenResponse", tokenResponse);
  let access_token = tokenResponse.body.access_token;
  console.log("access Tokken >>>", access_token);
  console.log("tokenResponse", tokenResponse);
  return access_token;
}
*/

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
    username: remoteUser.name,
    password: "oauthpassword",
    // email: remoteUser.email,
    // image: remoteUser.picture,
  };
  
  let userRecord = new users(record);
  console.log("-----------------------------");
  console.log(userRecord);
  console.log("-----------------------------");
  userRecord = {
    role: userRecord.role,
    username: userRecord.username,
    password: userRecord.password,
    // email: userRecord.email,
    // image: userRecord.image,
  };
  // let user = await userRecord.save();
  console.log("-----------------------------");
  console.log(userRecord);
  console.log("-----------------------------");
  let mighterr = await users.updateOne(
    { username: remoteUser.username },
    { $set: userRecord },
    { upsert: true }, // If set to true, creates a new document when no document matches the query criteria
  );
  console.log("mighterr", mighterr);
  let user = await users.findOne({ username: remoteUser.username });
  let token = await Users.generateToken(user);
  return [user, token];
}
  