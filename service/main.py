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

@app.route('/api/login', methods=['POST'])
def api_login():
  data = request.get_json();
  username = kysClass.getDscStr(data['username'])
  password = kysClass.getDscStr(data['password'])
  data = Sql.sqlMysql("SELECT `name`, id FROM chat_users WHERE `username` = '%s' AND `password` = '%s'" % (username, password))
  if len(data):
    user = data[0]
    session['WEB_INFO'] = user['id']
    return eMsg.succes({
      'name': user['name']
    })
  else:
    return eMsg.err('账户或密码错误')

@app.route('/api/logout', methods=['GET'])
def api_logout():
  session.pop('WEB_INFO',None)
  return eMsg.succes(None)

@app.route('/api/userinfo', methods=['GET'])
def api_userinfo():
  key = session.get('WEB_INFO')
  if key is None:
    return eMsg.not_login()
  else:
    data = Sql.sqlMysql("SELECT `name` FROM chat_users WHERE id = '%s'" % (key))
    if len(data):
      return eMsg.succes(data[0])
    else:
      return eMsg.err('用户不存在')
  

@app.after_request
def after_request(resp):
  resp.headers['Access-Control-Allow-Origin'] = 'http://localhost:4200'
  resp.headers['Access-Control-Allow-Credentials'] = 'true'
  resp.headers['Access-Control-Allow-Headers'] = 'Accept,Authorization,Cache-Control,Content-Type,Pragma,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With,Access-Code'
  resp.headers['Access-Control-Allow-Methods'] = 'POST，GET，OPTIONS，DELETE，PUT'
  return resp

NAME_SPACE = '\chat'

@socketio.on('connect', namespace=NAME_SPACE)
def test_connect():
    emit('my response', {'data': 'Connected'})

@socketio.on('disconnect', namespace=NAME_SPACE)
def test_disconnect():
    print('Client disconnected')

@socketio.on('open', namespace=NAME_SPACE)
def test_connect():
  print '------1-------'
  emit('my response', {'data': 'Connected'})

@socketio.on('close', namespace=NAME_SPACE)
def test_disconnect():
  print '------2-------'
  print('Client disconnected')

@socketio.on('message', namespace=NAME_SPACE)
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
  socketio.run(app, host="0.0.0.0", port=8090, debug=True)