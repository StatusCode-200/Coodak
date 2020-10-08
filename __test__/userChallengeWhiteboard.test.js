require("@code-fellows/supergoose");
const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);
const base64 = require("base-64");

describe("/user projects routes", () => {
  const challenge = { name: "adnan", test: "as" };
  const obj = {username: "laith", password: "1234", role: "admin"};
  const whiteboard = {bigo: "bigo", algorithm: "1234", problem_domain: "problem_domain"};
  let token = "";
  let userId = "";
  let challengeId = "";
  let userChallengeId = "";
  it("/signup as valid user", () =>{
    return  mockRequest.post("/users/signup")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to signin
      });
  });

  it("/signin as valid user", () => {
    let header={
      headers:{
        authorization: "laith:1234",
      },
    };
    let header3=base64.encode(header.headers.authorization);
    return mockRequest.post("/users/signin").set({authorization:`Basic ${header3}`})
      .send(obj)
      .then((response)=>{
        const [tokenWithPath] = response.headers["set-cookie"];
        const [tokenText] = tokenWithPath.split(";");
        token = tokenText.substr(tokenText.indexOf("=") + 1);
        expect(response.status).toEqual(302); // redirect to home page
      });
  });

  it("/users list users", () => {
    return mockRequest.get("/users").set({authorization:`Bearer ${token}`})
      .send(obj)
      .then((response) => {
        userId = response.body.data[0]["_id"];
        expect(response.status).toEqual(200);
      });
  });

  it("post challenge", () => {
    return mockRequest.post("/challenges").set({ authorization: `Bearer ${token}` })
      .send(challenge)
      .then((response) => {
        expect(response.status).toEqual(200);//unmodified
      });
  });

  it("list challenges json", () => {
    return mockRequest.get("/challenges/json").set({ authorization: `Bearer ${token}` })
      .send(obj)
      .then((response) => {
        challengeId = response.body.data[0]._id;
        expect(response.status).toEqual(200);//unmodified
      });
  });

  it("create user challenge", () => {
    return mockRequest.post(`/users/${userId}/challenges`).set({ authorization: `Bearer ${token}` })
      .send({ challenge_id: challengeId, solution: "solution" })
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to profile
      });
  });

  it("get user challenges", () => {
    return mockRequest.get(`/users/${userId}/challenges`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        userChallengeId = response.body.data[0]._id;
        expect(response.status).toEqual(200);
      });
  });

  it("get user challenge whiteboard", () => {
    return mockRequest.get(`/users/${userId}/challenges/${userChallengeId}/whiteboard`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("post user challenge whiteboard", () => {
    return mockRequest.post(`/users/${userId}/challenges/${userChallengeId}/whiteboard`).set({ authorization: `Bearer ${token}` })
      .send(whiteboard)
      .then((response) => {
        expect(response.status).toEqual(200); // samara render the page again to redirect it
      });
  });

  it("put user challenge whiteboard", () => {
    return mockRequest.put(`/users/${userId}/challenges/${userChallengeId}/whiteboard`).set({ authorization: `Bearer ${token}` })
      .send(whiteboard)
      .then((response) => {
        expect(response.status).toEqual(302); // refresh the same page
      });
  });

  it("delete user challenge whiteboard", () => {
    return mockRequest.delete(`/users/${userId}/challenges/${userChallengeId}/whiteboard`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200); // refresh the same page
      });
  });
});
