import socket
import threading
from ..config import Config
from http.server import BaseHTTPRequestHandler, HTTPServer

class GreenhouseDiscoveryWebServer (BaseHTTPRequestHandler):

  def do_GET (self):
    self.send_response(200)
    self.send_header('Content-type','application/xml')
    self.end_headers()
    message = "Hello, World! Here is a GET response"
    self.wfile.write(bytes(message, "utf8"))  


class ServeUPnPXML (threading.Thread):

  def __init__ (self):
    threading.Thread.__init__(self)
    self.interrupted = False

  def run (self): 
    # Start listening inside a thread
    self.__serveXML()

  def __serveXML (self):
    server = HTTPServer(('', 12323), GreenhouseDiscoveryWebServer)
    server.serve_forever()
