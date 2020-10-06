require("@code-fellows/supergoose");
const { server } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);
const base64 = require("base-64");

describe("/auth routes", () => {
  const obj = {username: "laith", password: "1234", role: "admin"};
  let token = "";
  let userId = "";
  it("/signup as valid user", () =>{
    return  mockRequest.post("/users/signup")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to signin
      });
  });

  it("/signup duplicate user", () =>{
    return  mockRequest.post("/users/signup")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to singup with error message in query
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

  it("/signin as in valid user", () => {
    let header={
      headers:{
        authorization: "laith:asddsasd",
      },
    };
    let header3=base64.encode(header.headers.authorization);
    return mockRequest.post("/users/signin").set({authorization:`Basic ${header3}`})
      .send(obj)
      .then((response)=>{
        expect(response.status).toEqual(302); // redirect to login with error message
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

  it("/users/:userId get user", () => {
    return mockRequest.get(`/users/${userId}`).set({authorization:`Bearer ${token}`})
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("/users post user", () => {
    return mockRequest.post(`/users`).set({authorization:`Bearer ${token}`})
      .send({ username: "test", password: "asd", role: "user" })
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("/users post duplicate user", () => {
    return mockRequest.post(`/users`).set({authorization:`Bearer ${token}`})
      .send({ username: "test", password: "asd", role: "user" })
      .then().catch((e) => {
        expect(e.message).toEqual("user is already exists");
      });
  });

  it("/users update user", () => {
    return mockRequest.put(`/users/${userId}`).set({authorization:`Bearer ${token}`})
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("/users delete user", () => {
    return mockRequest.delete(`/users/${userId}`).set({authorization:`Bearer ${token}`})
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("/users get secret", () => {
    return mockRequest.get("/users/secret").set({authorization:`Bearer ${token}`})
      .then((response) => {
        expect(response.status).toEqual(200);
      });
  });

  it("/users get secret inValidToken", () => {
    return mockRequest.get("/users/secret").set({authorization:`Bearer invalidToken`})
      .then((response) => {
        expect(response.status).toEqual(500);
      });
  });

  it("/users get secret noToken", () => {
    return mockRequest.get("/users/secret")
      .then((response) => {
        expect(response.status).toEqual(500);
      });
  });


});
