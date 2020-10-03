const superagent = require('superagent');
// const users = require('../users.js');
const Users = require('../../users/controllers/userModel.js');
const users = require('../../users/models/userSchema.js');

const {
    CLIENT_ID2,
    CLIENT_SECRET2,
} = process.env;
const API_SERVER = 'http://localhost:4000/oauth';

module.exports = async function (req, res, next) {
    try {
        let code = req.query.code;
        console.log('(1) CODE:', code);

        const remoteToken = await exchangeCodeForToken(code);
        console.log('(2) ACCESS TOKEN:', remoteToken);

        const remoteUser = await getRemoteUserInfo(remoteToken);
        console.log('(3) GOOGLE USER', remoteUser);

        const [user, token] = await getUser(remoteUser);
        req.token = token;
        req.user = user;

        console.log('(4) LOCAL USER', user);
        next();
    } catch (e) {
        next(`ERROR: ${e.message}`);
    }
};

// this will use the access_token github api endpoint
async function exchangeCodeForToken(code) {
    console.log('CLIENT_ID2',CLIENT_ID2)
    console.log('CLIENT_SECRET2',CLIENT_SECRET2)
    const tokenResponse = await superagent.post('https://www.googleapis.com/oauth2/v4/token')
        .send({
            code: code,
            client_id: CLIENT_ID2,
            client_secret: CLIENT_SECRET2,
            redirect_uri: API_SERVER,
            grant_type: 'authorization_code',
        });

    console.log('exchangeCodeForToken Out');
console.log('tokenResponse',tokenResponse )
    let access_token = tokenResponse.body.access_token;
    console.log('access Tokken >>>', access_token)
    console.log('tokenResponse',tokenResponse )
  return access_token;
}

// this will use the user api endpoint to get user info/repo info
async function getRemoteUserInfo(token) {
    // this will use the access token to get user details
    const userResponse = await superagent.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
        .set('user-agent', 'express-app')
        .set('Authorization', `token ${token}`);

    const user = userResponse.body;
    return user;
}

async function getUser(remoteUser) {
    const record = {
        username: remoteUser.email,
        password: 'oauthpassword',
    };

    // const user = await users.save(userRecord);
    // const token = users.generateToken(user);
    let userRecord = new users(record);
  let user = await userRecord.save();
  let token = await Users.generateToken(user);
    return [user, token];
}