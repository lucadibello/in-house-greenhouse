package backend.controller;

import backend.exception.GreenhouseNotInitializedException;
import backend.model.util.Greenhouse;
import backend.model.util.GreenhouseSetup;
import backend.service.GreenhouseService;

public class GreenhouseController {
    private final GreenhouseService greenhouseService;

    public GreenhouseController() {
        this.greenhouseService = new GreenhouseService(new backend.repository.GreenhouseRepository());
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
