import mongoose from 'mongoose'
import {User} from './userinfo'

function initModels(opts) {
  let mongohost = opts.server || 'localhost'
  let mongodb = opts.database || 'test'
  let port = opts.port || '27017'
  let auth = ''
  if (opts.user && opts.psw) {
    auth = `${opts.user}:${opts.psw}@`
  }
  let mongoURL = `mongodb://${auth}${mongohost}:${port}/${mongodb}`
  console.log(mongoURL);
  mongoose.connect(mongoURL)
}

function addModel(name, schema) {
  let model = mongoose.model(name, schema)
  return model
}

export {initModels, addModel}