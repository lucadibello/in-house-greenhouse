import socket
import threading
from ..config import Config
import http.server

class GreenhouseDiscoveryWebServer (http.server.BaseHTTPRequestHandler):
  def do_GET (self):
    with open("./modules/UPnP/data/UPNP.xml", "rb") as file:
      self.send_response(200)
      self.send_header('Content-type','application/xml')
      self.end_headers()

      # Send XML file back
      self.wfile.write(file.read())

class ServeUPnPXML: 

  def __init__ (self, host: str = "localhost", port: int = 80):
    # Create HTTP server
    self.httpd = http.server.HTTPServer((host, port), GreenhouseDiscoveryWebServer, False)
    self.httpd.timeout = 0.5

  def run (self) -> str: 
    # Bind server to port
    self.httpd.server_bind()
    # Save address
    address = "http://%s:%d" % (self.httpd.server_name, self.httpd.server_port)
    # Activate web server
    self.httpd.server_activate()

    # Server serve infinite HTTP requests
    def serve_forever(httpd):
      with httpd:  # to make sure httpd.server_close is called
        httpd.serve_forever()
    
    # Start server in new thread
    thread = threading.Thread(target=serve_forever, args=(self.httpd, ))
    thread.setDaemon(True)
    thread.start()

    return address
