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

  it("render the challenges page", () => {
    return mockRequest.get("/challenges").set({ authorization: `Bearer ${token}` })
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200);//unmodified
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

  it("get challenges", () => {
    return mockRequest.get(`/challenges/${challengeId}`).set({ authorization: `Bearer ${token}` })
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("post challenges test", () => {
    return mockRequest.post(`/challenges/${challengeId}/test`).set({ authorization: `Bearer ${token}` })
      .send({ solution: "solution" })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("post challenges test no solution", () => {
    return mockRequest.post(`/challenges/${challengeId}/test`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(500); // no solution
      });
  });

  it("delete challenge", () => {
    return mockRequest.delete(`/challenges/${challengeId}`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

});
