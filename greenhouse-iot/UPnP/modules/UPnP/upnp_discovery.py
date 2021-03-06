import socket
import threading
from ..config import Config

class GreenhouseDiscovery(threading.Thread):
  BCAST_IP = '239.255.255.250'
  UPNP_PORT = 1900
  IP = '0.0.0.0'
  M_SEARCH_REQ_MATCH = "M-SEARCH"  

  def __init__(self, xmlServerIpAddress: str = "127.0.0.1"):
    threading.Thread.__init__(self)
    self.interrupted = False
    self.XML_SERVER_IP= xmlServerIpAddress

  def run(self):
    # Start listening for UPnP discovery requests
    self.listen()
  
  def stop(self):
    self.interrupted = True
    print("[*] UPnP server stop")

  def listen(self):
    '''
    Listen on broadcast addr with standard 1900 port.
    It will reponse with standard SSDP message with basic information related to the greenhouse.
    '''
    try:
      sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
      sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
      sock.setsockopt(socket.IPPROTO_IP, socket.IP_ADD_MEMBERSHIP, socket.inet_aton(self.BCAST_IP) + socket.inet_aton(self.IP))
      sock.bind((self.IP, self.UPNP_PORT))
      sock.settimeout(1)

      print("[*] UPnP server is listening...")
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
      print('[!] Error in npnp server listening: %s', e)

  def respond(self, addr):
    try:
      local_ip = socket.gethostbyname(socket.gethostname()) 
      UPNP_RESPONSE = [
        "HTTP/1.1 200 OK",
        "HOST: 239.255.255.250:1900",
        "NTS: ssdp:alive",
        "ST: urn:in-house-greenhouse:service:GreenhouseNetworkScanner:1",
        "Location: http://{}:12323".format(self.XML_SERVER_IP),
        "Server: in-house-greenhouse/1.0.0",
        "Cache-Control: max-age=1800"
      ]

      # Build message
      responseData = '\r\n'.join(UPNP_RESPONSE)

      # Send back data
      outSock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
      outSock.sendto(responseData.encode('ASCII'), addr)
      
      # Debug
      print('[INFO] Sent UPnP response packet')
      
      # Close socket
      outSock.close()
    except Exception as e:
      print('[!] Error in upnp response message to client %s', e)

if __name__ == '__main__':
  # Create GreenhouseDiscovery object
  discovery = GreenhouseDiscovery()
  discovery.run()