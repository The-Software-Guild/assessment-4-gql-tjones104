const chai = require("chai");
const url = `http://localhost:8080/`;
const request = require("supertest")(url);

chai.should();

describe("GraphQL", () => {
  it("Should return all issues with id and title", (done) => {
    request
      .post("/")
      .send({ query: "query {getIssues {id title} }" })
      .end((err, res) => {
        res.body.should.be.a("object");
        res.body.data.getIssues.should.be.a("array");
        res.body.data.getIssues.forEach((issue) => {
          issue.should.have.property("id");
          issue.should.have.property("title");
        });
        done();
      });
  });
});
