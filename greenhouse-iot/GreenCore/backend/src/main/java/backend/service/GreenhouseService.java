package backend.service;

import backend.exception.GreenhouseNotInitializedException;
import backend.exception.ProxyRequestFailException;
import backend.exception.RepositoryLoadException;
import backend.model.util.Greenhouse;
import backend.repository.GreenhouseRepository;

public class GreenhouseService {

    private final GreenhouseRepository greenhouseRepository;

    public GreenhouseService(GreenhouseRepository repository) {
        // Set greenhouse repository
        this.greenhouseRepository = repository;
    }

    public boolean addGreenhouse (String name, String description, String userToken) {
        try {
            // Create a new greenhouse
            greenhouseRepository.addGreenhouse(name, description, userToken);
            // Success!
            return true;
        } catch (ProxyRequestFailException e) {
            // print error
            System.out.println("PROXY ERROR: " + e.getResponse().errorMessage);
            // Return false
            return false;
        } catch (RepositoryLoadException e) {
            // Print error
            System.out.println("REPOSITORY ERROR: " + e.getMessage());
            // Return false
            return false;
        }
    }

    public Greenhouse getGreenhouse() throws GreenhouseNotInitializedException {
        try {
            // Load the greenhouse from the repository
            this.greenhouseRepository.load();
            // Return the UUID string
            return this.greenhouseRepository.getGreenhouse();
        } catch (RepositoryLoadException e) {
            // If the UUID could not be loaded, create a new one
            throw new GreenhouseNotInitializedException("Greenhouse not initialized, need to initialize first");
        }
    }
}
