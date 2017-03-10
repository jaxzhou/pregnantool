const supertest = require('supertest')
import {server} from '../../index.js'

describe("get /", ()=> {
  let mockRequest = supertest(server)

  it("should return version", (done)=>{
    mockRequest
    .get("/")
    .expect(200, {name:'pregnantool', version:'1.0.0'})
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  })

  it("should return error", (done)=>{
    mockRequest
    .post("/")
    .expect(405)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  })
})