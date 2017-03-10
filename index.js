import {startServer} from './src/server'
import {Router} from './src/Router'
import {initModels} from './src/Models'
import {config} from './config'

let packagejson = require("./package.json")
let serverOption = {
  name: packagejson.name,
  version: packagejson.version,
  host: config.server.host,
  port: config.server.port
}

let server = startServer(serverOption)
new Router(server)
initModels(config.mongodb)

export { server }