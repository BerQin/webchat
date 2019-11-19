# -*- coding: utf-8 -*-
from base64 import b64decode, b16decode
from Cryptodome.PublicKey import RSA
from Cryptodome.Cipher import PKCS1_OAEP, PKCS1_v1_5

class Rsa(object):
  def __init__(self, pub_file='./rsa_public_key.pem', pri_file='./rsa_private_key.pem'):
    self.pub_file = pub_file
    self.pri_file = pri_file

    # 公钥私钥
    self.pub_key = RSA.import_key(open(self.pub_file).read())
    self.pri_key = RSA.import_key(open(self.pri_file).read())

    # 加解密库
    self.pub_cip = PKCS1_v1_5.new(self.pub_key);
    self.pri_cip = PKCS1_v1_5.new(self.pri_key);

  def get_pub_key(self):
    return self.pub_key

  def get_pri_key(self):
    return self.pri_key

  def setBase64Str(self, data):
    decode_data = b64decode(data)
    if len(decode_data) == 127:
      hex_fixed = '00' + decode_data.hex()
      decode_data = b16decode(hex_fixed.upper())
    return decode_data

  def getRsaStr(self, data):
    text = self.pub_cip.encrypt(data)
    return text

  def getDscStr(self, data):
    text = self.pri_cip.decrypt(self.setBase64Str(data), None).decode();
    return text


def main():
    pass

if __name__ == '__main__':
  print('Rsa 为主程序')
  main()
else:
  print('Rsa 被另一个模块调用')