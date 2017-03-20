import {Schema} from 'mongoose'
import {addModel} from './index'

let info = new Schema({
  time: { type: Date, default: Date.now },
  weight: Number,
  waist: Number,
  fundal: Number
})

let user = new Schema({
  openid: {type: String, index: true, unique: true},
  name: String,
  height: Number,
  lastPeriod: Date,
  infos: [info]
})

let User = addModel('User', user)

export {User}