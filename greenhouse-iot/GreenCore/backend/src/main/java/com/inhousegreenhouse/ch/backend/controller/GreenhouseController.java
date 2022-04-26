package com.inhousegreenhouse.ch.backend.controller;

import com.inhousegreenhouse.ch.backend.exception.GreenhouseNotInitializedException;
import com.inhousegreenhouse.ch.backend.model.util.Greenhouse;
import com.inhousegreenhouse.ch.backend.model.util.GreenhouseSetup;
import com.inhousegreenhouse.ch.backend.repository.GreenhouseRepository;
import com.inhousegreenhouse.ch.backend.service.GreenhouseService;

public class GreenhouseController {
    private final GreenhouseService greenhouseService;

    public GreenhouseController() {
        // Get user home directory
        String homeDirectory = System.getProperty("user.home");

        // Append a directory called ".inhousegreenhouse" to the user home directory
        String greenRepo  = homeDirectory + "/.inhousegreenhouse";

        // Append a file called "greenhouse.json" to the user home directory
        greenRepo = greenRepo + "/greenhouse.json";

        // Create a new GreenhouseService
        this.greenhouseService = new GreenhouseService(new GreenhouseRepository(greenRepo));
    }

    public Greenhouse getGreenhouse() throws GreenhouseNotInitializedException {
        return this.greenhouseService.getGreenhouse();
    }

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

    public boolean isSetup() {
        try {
            this.greenhouseService.getGreenhouse();
            return true;
        } catch (GreenhouseNotInitializedException e) {
            return false;
        }
    }
}
