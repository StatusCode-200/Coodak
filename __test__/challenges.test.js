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
            console.log(response.body);
            expect(response.status).toEqual(200);//unmodified
        });
    });

    it("render one challenge page", () => {
        mockRequest.get("/challenges").set({ authorization: `Bearer ${token}` })
            .send(obj)
            .then((response) => {
                console.log(response.body);
                expect(response.status).toEqual(200);//unmodified
            });
        });
});

