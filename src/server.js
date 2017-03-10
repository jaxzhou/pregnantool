import {createServer, acceptParser, queryParser, bodyParser} from 'restify'

function startServer(options) {
  let server = createServer({
    name: options.name || 'pregnantool',
    version: options.version || '1.0.0'
  })

  server.use(acceptParser(server.acceptable))
  server.use(queryParser())
  server.use(bodyParser())

  server.listen(options.port || 8080, function () {
    console.log('%s listening at %s', server.name, server.url);
  })

  return server
}

export { startServer }