import mongoose from 'mongoose'
import {User} from './userinfo'

function initModels(opts) {
  let mongohost = opts.server || 'localhost'
  let mongodb = opts.database || 'test'
  let mongoURL = `mongodb://${mongohost}/${mongodb}`
  mongoose.connect(mongoURL)
}

function addModel(name, schema) {
  let model = mongoose.model(name, schema)
  return model
}

export {initModels, addModel}