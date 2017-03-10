const supertest = require('supertest')
import {server} from '../../index.js'
import {parseString} from 'xml2js'
import expect from 'expect'

describe("POST /wechat", ()=> {
  let mockRequest = supertest(server)

  it("receive xml", (done)=>{
    mockRequest
    .post("/wechat")
    .send("<xml>\
     <ToUserName><![CDATA[toUser_001]]></ToUserName>\
     <FromUserName><![CDATA[fromUser_001]]></FromUserName>\
     <CreateTime>1348831860</CreateTime>\
     <MsgType><![CDATA[image]]></MsgType>\
     <PicUrl><![CDATA[this is a url]]></PicUrl>\
     <MediaId><![CDATA[media_id]]></MediaId>\
     <MsgId>1234567890123456</MsgId>\
     </xml>")
    .expect((res)=>{
      parseString(res.body,(err,result)=>{
        expect(result).toExist()
        expect(result.xml).toExist()
        expect(result.xml.ToUserName[0]).toBe('fromUser_001')
        expect(result.xml.FromUserName[0]).toBe('toUser_001')
        expect(result.xml.MsgType[0]).toBe('text')
        expect(result.xml.Content[0]).toBe('按照格式输入体重腰围:  50kg  82cm')
      })
    })
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })
  })

  it('receive weight message', (done)=> {
    mockRequest
    .post("/wechat")
    .send("<xml>\
     <ToUserName><![CDATA[toUser_001]]></ToUserName>\
     <FromUserName><![CDATA[fromUser_001]]></FromUserName>\
     <CreateTime>1348831860</CreateTime>\
     <MsgType><![CDATA[text]]></MsgType>\
     <Content><![CDATA[85kg]]></Content>\
     <MsgId>1234567890123456</MsgId>\
     </xml>")
    .expect((res)=>{
      parseString(res.body,(err,result)=>{
        expect(result).toExist()
        expect(result.xml).toExist()
        expect(result.xml.ToUserName[0]).toBe('fromUser_001')
        expect(result.xml.FromUserName[0]).toBe('toUser_001')
        expect(result.xml.MsgType[0]).toBe('text')
        expect(result.xml.Content[0]).toBe('体重记录为85kg')
      })
    })
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })

  })

  it('receive waist message', (done)=> {
    mockRequest
    .post("/wechat")
    .send("<xml>\
     <ToUserName><![CDATA[toUser_001]]></ToUserName>\
     <FromUserName><![CDATA[fromUser_001]]></FromUserName>\
     <CreateTime>1348831860</CreateTime>\
     <MsgType><![CDATA[text]]></MsgType>\
     <Content><![CDATA[82cm]]></Content>\
     <MsgId>1234567890123456</MsgId>\
     </xml>")
    .expect((res)=>{
      parseString(res.body,(err,result)=>{
        expect(result).toExist()
        expect(result.xml).toExist()
        expect(result.xml.ToUserName[0]).toBe('fromUser_001')
        expect(result.xml.FromUserName[0]).toBe('toUser_001')
        expect(result.xml.MsgType[0]).toBe('text')
        expect(result.xml.Content[0]).toBe('腰围记录为82cm')
      })
    })
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })

  })
})