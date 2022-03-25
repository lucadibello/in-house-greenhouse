from modules import GreenhouseDiscovery, ServeUPnPXML

def __start_upnp_discovery():
  # Serve XML UPnP 
  xmlServer = ServeUPnPXML()
  address = xmlServer.run()
  print("XML Server address:", address)

  # Start UPnP discovery service 
  upnpDiscovery = GreenhouseDiscovery()
  upnpDiscovery.run()

def main ():
  # Start UPnP deamon on port 1900
  __start_upnp_discovery()

if __name__ == '__main__':
  main()