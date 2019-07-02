// const request = require("supertest");
// const environment = process.env.NODE_ENV || "development";
// const configuration = require("./knexfile")[environment];
// const database = require("knex")(configuration);

describe("Server", () => {
  it("should pass a test", () => {
    expect(true).toEqual(true);
  });

  // beforeEach(async () => {
  //   await database.seed.run();
  // });

  // describe("init", () => {
  //   it("should return a 200 status", async () => {
  //     const res = await request(app).get("/");
  //     expect(res.status).toBe(200);
  //   });
  // });

  // describe("GET /projects", () => {
  //   it("should return all the projects in the DB", async () => {
  //     // setup
  //     const expectedProjects = await database("projects").select();

  //     // execution
  //     const res = await request(app).get("/projects");
  //     const result = res.body;

  //     // expectation
  //     expect(result).toEqual(expectedProjects);
  //   });
  // });
});
