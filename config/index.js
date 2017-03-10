import { env } from 'process'

let nodeenv = env.NODE_ENV || 'development'
let config = require(`./${nodeenv}.js`)

export {config}