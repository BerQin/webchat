# -*- coding: utf-8 -*-

class Msg(object):
  def __init__(self):
    self.code = {
      'err': 0,
      'succes': 1,
      'notlogin': 404,
    }

  def err(self, msg = '无法访问', data = None):
    return {
      'code': self.code['err'],
      'data': data,
      'msg': msg
    }

  def succes(self, data = None, msg = '成功'):
    return {
      'code': self.code['succes'],
      'data': data,
      'msg': msg
    }
  
  def not_login(self, msg = '未登陆', data = None):
    return {
      'code': self.code['notlogin'],
      'data': data,
      'msg': msg
    }

def main():
    pass

if __name__ == '__main__':
  print('Msg 为主程序')
  main()
else:
  print('Msg 被另一个模块调用')