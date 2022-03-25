from modules import GreenhouseDiscovery

def __start_upnp_discovery():
  upnpDiscovery = GreenhouseDiscovery()
  upnpDiscovery.run()

def main ():
  # Start UPnP deamon on port 1900
  __start_upnp_discovery()

if __name__ == '__main__':
  main()