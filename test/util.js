var assert = require('assert')

exports.init = function(cb){
  var agent
  var request = require('supertest')
  var express = require('express')
  var cookieparser = require('cookie-parser')
  var bodyparser   = require('body-parser')
  var seneca = require('seneca')

  var si = require('seneca')({
    default_plugins:{web:false}
  })
  si.use('../web.js')

  si.ready(function(err){
    if( err ) return process.exit( !console.error(err) );

    var web = si.export('web')
    var app = express()
    app.use( cookieparser() )
    app.use( bodyparser.json() )
    app.use( web )
    agent = request(app)
    cb(null, agent, si)
  })
}

exports.log = function (res){
  // comment next line for logging of req/responses
  return
  console.log('\n****************************************')
  console.log('REQUEST URL : ', JSON.stringify(res.req.path))
  console.log('REQUEST     : ', JSON.stringify(res))
  console.log('STATUS      : ', JSON.stringify(res.status))
  console.log('RESPONSE    : ', JSON.stringify(res.text))
  console.log('****************************************')
}
