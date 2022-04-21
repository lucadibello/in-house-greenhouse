from modules import GreenhouseDiscovery, ServeUPnPXML
from modules import LocalIp

def __start_upnp_discovery():
  # Get LAN address
  IP = LocalIp.get_local_ip()

  # Serve XML UPnP 
  xmlServer = ServeUPnPXML(IP, 12323)
  xmlServer.run()

  # Start UPnP discovery service 
  upnpDiscovery = GreenhouseDiscovery(IP)
  upnpDiscovery.run()

def main ():
  # Start UPnP deamon on port 1900
  __start_upnp_discovery()

if __name__ == '__main__':
  main()