require("@code-fellows/supergoose");
const { server, start } = require("../src/server.js");
const supertest = require("supertest");
const mockRequest = supertest(server);
const base64 = require("base-64");
const http = require("http");

describe("/server routes", () => {
  const obj = {username: "laith", password: "1234", role: "admin"};
  let token = "";
  it("/test methodOverride", () =>{
    return  mockRequest.get("/users/signup?_method=POST")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(302); // redirect to signin
      });
  });

  it("/test render index", () =>{
    return  mockRequest.get("/")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/test render signin", () =>{
    return  mockRequest.get("/signin")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/test render signup", () =>{
    return  mockRequest.get("/signup")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/test render codeeditor", () =>{
    return  mockRequest.get("/codeeditor")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/signup user", () =>{
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
    let header3= base64.encode(header.headers.authorization);
    return mockRequest.post("/users/signin").set({authorization:`Basic ${header3}`})
      .send(obj)
      .then((response)=>{
        const [tokenWithPath] = response.headers["set-cookie"];
        const [tokenText] = tokenWithPath.split(";");
        token = tokenText.substr(tokenText.indexOf("=") + 1);
        expect(response.status).toEqual(302); // redirect to home page
      });
  });

  it("/test render profile", () =>{
    return  mockRequest.get("/profile").set({ authorization: `Bearer ${token}` })
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/test addChallenge", () =>{
    return  mockRequest.get("/addChallenge")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(200); // redirect to signin
      });
  });

  it("/test oauth", () =>{
    return  mockRequest.get("/oauth")
      .send(obj)
      .then((response) => {
        expect(response.body.msg).toEqual("ERROR: Bad Request"); // redirect to signin
      });
  });

  it("/test oauth2", () =>{
    return  mockRequest.get("/oauth2")
      .send(obj)
      .then((response) => {
        expect(response.body.msg).toEqual("ERROR: Unauthorized"); // redirect to signin
      });
  });

  it("/test notfound", () =>{
    return  mockRequest.get("/notfound")
      .send(obj)
      .then((response) => {
        expect(response.status).toEqual(404); // redirect to signin
      });
  });

  it("/test serverLiestening", () => {
    start();
    const options = {
      host: "127.0.0.1",
      port: 4000, // env PORT
      path: "/",
    };
    const req = http.request(options);
    req.end();
  });


});
