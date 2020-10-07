require("@code-fellows/supergoose");
const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);
const base64 = require("base-64");

describe("/user projects routes", () => {
  const obj = {username: "laith", password: "1234", role: "admin"};
  let token = "";
  let userId = "";
  let projectId = "";
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

  it("render user projects page", () => {
    return mockRequest.get(`/users/${userId}/projects`).set({ authorization: `Bearer ${token}` })
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });


  it("post user project", () => {
    return mockRequest.post(`/users/${userId}/projects`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to profile
      });
  });

  it("list user projects", () => {
    return mockRequest.get(`/users/${userId}/projects`).set({ authorization: `Bearer ${token}` })
      .send(obj)
      .then((response) => {
        projectId = response.body.data[0]._id;
        expect(response.status).toEqual(200);//unmodified
      });
  });

  it("get user project", () => {
    return mockRequest.get(`/users/${userId}/projects/${projectId}`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("put user project", () => {
    return mockRequest.put(`/users/${userId}/projects/${projectId}`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });
  /*
  it("delete challenge", () => {
    return mockRequest.delete(`/challenges/${challengeId}`).set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  */

});
