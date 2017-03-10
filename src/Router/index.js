import {Wechat} from './wechat'
class Router {
  constructor(server) {
    this.server = server
    let servername = server.name
    let serverversion = server.versions
    this.server.get("/", function(req,res,next){
      res.send({name: servername, version : serverversion})
      return next()
    })
    new Wechat(server)
  }
}

export { Router }