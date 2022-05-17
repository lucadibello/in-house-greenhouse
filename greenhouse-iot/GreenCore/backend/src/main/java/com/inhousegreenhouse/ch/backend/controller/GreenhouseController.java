package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.exception.GreenhouseNotInitializedException;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.model.util.GreenhouseSetup;
import com.inhousegreenhouse.ch.backend.repository.GreenhouseRepository;
import com.inhousegreenhouse.ch.backend.service.GreenhouseService;

import java.util.Properties;

/**
 * Controller for the greenhouse.
 */
public class GreenhouseController {

    /**
     * Greenhouse service. It will be used to execute operations on the greenhouse.
     */
    private final GreenhouseService greenhouseService;

    /**
     * Constructor.
     * @param settings The loaded settings of the greenhouse.
     */
    public GreenhouseController(Properties settings) {
        // Get user home directory
        String homeDirectory = System.getProperty("user.home");

        // Append a directory called ".inhousegreenhouse" to the user home directory
        String greenRepo  = homeDirectory + "/.inhousegreenhouse";

        // Append a file called "greenhouse.json" to the user home directory
        greenRepo = greenRepo + "/greenhouse.json";

        // Build proxy URL using host and port
        String proxyUrl = "http://" + settings.getProperty("greencore.proxy.host") + ":" + settings.getProperty("greencore.proxy.port") + settings.getProperty("greencore.proxy.route");

        // Create a new GreenhouseService
        this.greenhouseService = new GreenhouseService(new GreenhouseRepository(greenRepo, proxyUrl));
    }

    /**
     * Get the current greenhouse.
     * @return The current greenhouse as a Greenhouse object.
     * @throws GreenhouseNotInitializedException If the greenhouse is not initialized.
     */
    public Greenhouse getGreenhouse() throws GreenhouseNotInitializedException {
        return this.greenhouseService.getGreenhouse();
    }

    /**
     * Register a new greenhouse.
     * @param greenhouseSetup The greenhouse settings, required to initialize the greenhouse.
     * @return True if the greenhouse was successfully initialized, false otherwise.
     */
    public boolean registerGreenhouse (GreenhouseSetup greenhouseSetup) {
        try {
            return this.greenhouseService.addGreenhouse(
                greenhouseSetup.getName(),
                greenhouseSetup.getDescription(),
                greenhouseSetup.getToken()
            );
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("[ERROR]: " + e.getMessage());
            return false;
        }
    }

    /**
     * Check if the greenhouse is initialized.
     * @return True if the greenhouse is initialized, false otherwise.
     */
    public boolean isSetup() {
        try {
            this.greenhouseService.getGreenhouse();
            return true;
        } catch (GreenhouseNotInitializedException e) {
            return false;
        }
    }
}
