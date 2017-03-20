const supertest = require('supertest')
import {server} from '../../index.js'
import {parseString} from 'xml2js'
import expect from 'expect'

describe("GET /wechat", ()=>{
  let mockRequest = supertest(server)

  it("verify success", (done)=>{
    mockRequest
    .get("/wechat?signature=s1&timestamp=0&nonce=1&echostr=echo")
    .expect(200,"echo")
    .end((err,res)=>{
      if (err) return done(err)
      done()
    })
  })
})

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
     <Content><![CDATA[85.4kg]]></Content>\
     <MsgId>1234567890123456</MsgId>\
     </xml>")
    .expect((res)=>{
      parseString(res.body,(err,result)=>{
        expect(result).toExist()
        expect(result.xml).toExist()
        expect(result.xml.ToUserName[0]).toBe('fromUser_001')
        expect(result.xml.FromUserName[0]).toBe('toUser_001')
        expect(result.xml.MsgType[0]).toBe('text')
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
      })
    })
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })

  })

  it('receive fundal height message', (done)=> {
    mockRequest
    .post("/wechat")
    .send("<xml>\
     <ToUserName><![CDATA[toUser_001]]></ToUserName>\
     <FromUserName><![CDATA[fromUser_001]]></FromUserName>\
     <CreateTime>1348831860</CreateTime>\
     <MsgType><![CDATA[text]]></MsgType>\
     <Content><![CDATA[32cm]]></Content>\
     <MsgId>1234567890123456</MsgId>\
     </xml>")
    .expect((res)=>{
      parseString(res.body,(err,result)=>{
        expect(result).toExist()
        expect(result.xml).toExist()
        expect(result.xml.ToUserName[0]).toBe('fromUser_001')
        expect(result.xml.FromUserName[0]).toBe('toUser_001')
        expect(result.xml.MsgType[0]).toBe('text')
      })
    })
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    })

  })

})