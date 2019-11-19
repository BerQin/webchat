# coding=UTF-8
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sys
from key.rsa import Rsa
from sql.mysql import MySql
from msg.msg import Msg
import os
from flask_socketio import SocketIO, emit, send

reload(sys)
sys.setdefaultencoding('utf-8')

app = Flask(__name__)
CORS(app, resources=r'/*')
app.config['SECRET_KEY'] = os.urandom(24)
socketio = SocketIO(app)

@app.after_request
def after_request(resp):
  resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
  resp.headers['Access-Control-Allow-Credentials'] = 'true'
  resp.headers['Access-Control-Allow-Headers'] = 'Accept,Authorization,Cache-Control,Content-Type,Pragma,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With,Access-Code'
  resp.headers['Access-Control-Allow-Methods'] = 'POST，GET，OPTIONS，DELETE，PUT'
  return resp

NAME_SPACE = '\chat'

@socketio.on('open')
def test_connect():
  print '------1-------'
  emit('my response', {'data': 'Connected'})

@socketio.on('close')
def test_disconnect():
  print '------2-------'
  print('Client disconnected')

@socketio.on('message')
def handle_message(msg):
  print '------3-------'
  print('received message' + message)
  emit('message', {
    'code': 1,
    'data': 'asdasd',
    'msg': '成功'
  })
  
if __name__ == "__main__":
  kysClass = Rsa('./key/rsa_public_key.pem', './key/rsa_private_key.pem')
  Sql = MySql()
  eMsg = Msg()
  socketio.run(app, host="0.0.0.0", port=8080, debug=True)