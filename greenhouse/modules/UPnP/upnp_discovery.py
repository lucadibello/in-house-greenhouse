import socket
import threading
from ..config import Config

class GreenhouseDiscovery(threading.Thread):
  BCAST_IP = '239.255.255.250'
  UPNP_PORT = 1900
  IP = '0.0.0.0'
  M_SEARCH_REQ_MATCH = "M-SEARCH"

  def __init__(self):
    threading.Thread.__init__(self)
    self.interrupted = False

  def run(self):
    self.listen()
  
  def stop(self):
    self.interrupted = True
    print("upnp server stop")

  def listen(self):
    '''
    Listen on broadcast addr with standard 1900 port
    It will reponse a standard ssdp message with blockchain ip and port info if receive a M_SEARCH message
    '''
    try:
      sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
      sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
      sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(self.BCAST_IP) + socket.inet_aton(self.IP))
      sock.bind((self.IP, self.UPNP_PORT))
      sock.settimeout(1)

      print("upnp server is listening...")
      while True:
        try:
          data, addr = sock.recvfrom(1024)
        except socket.error:
          if self.interrupted:
            sock.close()
            return
        else:
          # DO SOMETHING HERE
          self.respond(addr)
    except Exception as e:
      print('Error in npnp server listening: %s', e)

  def respond(self, addr):
    try:
      # local_ip = # FIND THE IP
      UPNP_RESPOND = """
      HTTP/1.1 200 OK
      Cache-Control: max-age=1800
      ST: urn:{}
      Ext:
      Location: {}
      Server: "in-house-greenhouse/1.0.0"
      """.format(
        # ADD YOUR DATA TO BE SHARED
        "in-house-greenhouse:service:GreenhouseScanner:1",
        self.IP
      ).replace("\n", "\r\n")

      outSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
      outSock.sendto(UPNP_RESPOND.encode('ASCII'), addr)
      print('response data: %s', UPNP_RESPOND)
      outSock.close()
    except Exception as e:
      print('Error in upnp response message to client %s', e)

if __name__ == '__main__':
  # Create GreenhouseDiscovery object
  discovery = GreenhouseDiscovery()
  discovery.run()