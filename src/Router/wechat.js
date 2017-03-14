import {parseString,} from 'xml2js'
import {User} from '../Models/userinfo'

function wrapCDATA(txt) {
  return `\<![CDATA[${txt}]]\>`
}

function createTextMessage(content, userOpenId, fromOpenId) {
  let xmlObject = {
      ToUserName: wrapCDATA(userOpenId),
      FromUserName: wrapCDATA(fromOpenId),
      CreateTime: parseInt(new Date().getTime()),
      MsgType: wrapCDATA('text'),
      Content: wrapCDATA(content)
    }
  let xml = ""
  for (let key in xmlObject) {
    let property = `<${key}>${xmlObject[key]}</${key}>`
    xml += property
  }
  return `<xml>${xml}</xml>`
}

function buildInfoList(infos) {
  let grid = '| 时间 | 体重 | 腰围 |\r\n'
  grid += '-------------------\r\n'
  for(let info of infos) {
    let line = `| ${info.time.toDateString()} | ${info.weight}kg | ${info.waist}cm |\r\n`
    grid += line
  }
  return grid
}

class Wechat {

  constructor(server) {
    this.server = server
    server.post("/wechat", this.postMessage.bind(this))
    server.get("/wechat", this.getMessage.bind(this))
  }

  getMessage(req, res, next){
    let echostr = req.params.echostr
    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(echostr),
      'Content-Type': 'text/application'
    })
    res.write(echostr)
    res.end()
  }

  postMessage(req, res, next) {
    parseString.call(this, req.body, (err,result)=> {
      if (err) {
        console.log(err)
        return next(err)
      }
      if (result && result.xml) {
        let message = result.xml
        let msgType = message.MsgType
        if (this[msgType]) {
          this[msgType](message, (resMessage)=>{
            res.send(200, resMessage)
          })
        } else {
          console.log('message type not support')
          next(new Error('message type not support'))
        }
      }
    })
  }

  image(imageMessage, callback) {
    let userOpenId = imageMessage.FromUserName
    let imageUrl = imageMessage.PicUrl
    callback(createTextMessage('按照格式输入体重腰围:  50kg  82cm', userOpenId, imageMessage.ToUserName))
  }

  text(textMessage, callback) {
    let userOpenId = textMessage.FromUserName
    let content = textMessage.Content[0]
    let weight = content.match(/(\d+)kg/)
    let waist = content.match(/(\d+)cm/)
    if (!weight && !waist) {
      return callback(createTextMessage('按照格式输入体重腰围:  50kg  82cm', userOpenId, textMessage.ToUserName))
    }
    let txt = ""
    let info = {}
    if (weight) {
      txt += `体重记录为${weight[1]}kg`
      info.weight = weight[1]
    }
    if (waist) {
      txt += `腰围记录为${waist[1]}cm`
      info.waist = waist[1]
    }
    User.findOne({openid:userOpenId}, (err, user)=>{
      if(!user) {
        user = new User({openid:userOpenId, infos:[info]})
      } else {
        let lastinfo = user.infos[user.infos.length-1]
        let lastdate = lastinfo.time.toDateString()
        let now = new Date().toDateString()
        if (now === lastdate) {
          lastinfo.weight = info.weight || lastinfo.weight
          lastinfo.waist = info.waist || lastinfo.waist
        } else {
          user.infos.push(info)
        }
      }
      user.save(()=>{
        let info = buildInfoList(user.infos)
        callback(createTextMessage(info, userOpenId, textMessage.ToUserName))
      })
    })
  }

  event(eventMessage, callback) {
    let eventType = eventMessage.Event
    if (this[eventType]) {
      this[eventType](eventMessage, callback)
    }
  }

  subscribe(eventMessage, callback) {
    let userOpenId = eventMessage.FromUserName
    return callback(createTextMessage('按照格式输入体重腰围:  50kg  82cm', userOpenId, eventMessage.ToUserName))
  }
}

export { Wechat }