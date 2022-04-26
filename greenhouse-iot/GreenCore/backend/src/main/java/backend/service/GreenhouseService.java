package backend.service;

import backend.exception.GreenhouseNotInitializedException;
import backend.exception.ProxyRequestFailException;
import backend.exception.RepositoryLoadException;
import backend.model.util.Greenhouse;
import backend.repository.GreenhouseRepository;

/**
 * Service for Greenhouse.
 */
public class GreenhouseService {

    /**
     * The GreenhouseRepository, used to load data.
     */
    private final GreenhouseRepository greenhouseRepository;

    /**
     * Constructor for GreenhouseService.
     * @param repository The GreenhouseRepository to use.
     */
    public GreenhouseService(GreenhouseRepository repository) {
        // Set greenhouse repository
        this.greenhouseRepository = repository;
    }

    /**
     * Add a new greenhouse to the repository.
     * @param name The name of the greenhouse.
     * @param description The description of the greenhouse.
     * @param userToken The user token of the user.
     * @return The UUID of the greenhouse.
     */
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

    /**
     * Get a greenhouse from the repository.
     * @return The greenhouse.
     * @throws GreenhouseNotInitializedException If the greenhouse is not initialized.
     */
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
