require("@code-fellows/supergoose");
const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);
const base64 = require("base-64");

describe("/challenges routes", () => {
  const obj = {username: "laith", password: "1234", role: "admin"};
  const challenge = { name: "adnan", test: "as" };
  let token = "";
  let challengeId = "";
  let commentId = "";
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

  it("post challenge", () => {
    return mockRequest.post("/challenges").set({ authorization: `Bearer ${token}` })
      .send(challenge)
      .then((response) => {
        expect(response.status).toEqual(200);//unmodified
      });
  });

  it("list challenges json", () => {
    return mockRequest.get("/challenges/json").set({ authorization: `Bearer ${token}` })
      .then((response) => {
        challengeId = response.body.data[0]._id;
        expect(response.status).toEqual(200);//unmodified
      });
  });

  it("get challenges comments page", () => {
    return mockRequest.get(`/challenges/${challengeId}/comments`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("post challenges comments", () => {
    return mockRequest.post(`/challenges/${challengeId}/comments`).set({ authorization: `Bearer ${token}` })
      .send({ comment: "comment" })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("get challenges comments json", () => {
    return mockRequest.get(`/challenges/${challengeId}/comments/json`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        commentId = response.body.data[0]._id;
        expect(response.status).toEqual(200);
      });
  });

  it("put challenge comment", () => {
    return mockRequest.put(`/challenges/${commentId}/comments`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("delete challenge comment", () => {
    return mockRequest.delete(`/challenges/${commentId}/comments`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });
});
