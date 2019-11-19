# -*- coding: utf-8 -*-
import MySQLdb

class MySql(object):
  def __init__(self):
    self.host = 'localhost'
  
  def linkSql(self):
    self.conn = MySQLdb.connect(host=self.host, user='root', passwd='QWE123456@asd' , port=3306, db='webchatwith', charset="utf8")
    cur = self.conn.cursor(cursorclass = MySQLdb.cursors.DictCursor)
    return cur

  def sqlMysql(self, sql):
    cur = self.linkSql()
    cur.execute(sql)
    df = cur.fetchall()
    self.conn.close()
    return df;

def main():
    pass

if __name__ == '__main__':
  print('SQL 为主程序')
  main()
else:
  print('SQL 被另一个模块调用')