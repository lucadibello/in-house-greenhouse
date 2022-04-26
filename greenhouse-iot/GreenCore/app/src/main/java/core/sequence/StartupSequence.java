package core.sequence;

import backend.controller.GreenhouseController;
import backend.exception.GreenhouseNotInitializedException;
import backend.model.util.Greenhouse;

/**
 * This class is responsible for starting the monitoring system.
 */
public class StartupSequence extends Sequence implements IGreenhouseSequence {

    /**
     * The GreenhouseController used to talk with the backend.
     */
    private final GreenhouseController greenhouseController;

    /**
     * Constructor.
     */
    public StartupSequence() {
        super("START_UP_SEQUENCE");
        greenhouseController = new GreenhouseController();
    }

    /**
     * Starts the monitoring system.
     */
    @Override
    public void run() {
        System.out.println("-- S T A R T U P\t S E Q U E N C E --");
        System.out.println("[!] Starting up In-House Greenhouse system...");
        try {
            // Load greenhouse
            Greenhouse greenhouse = greenhouseController.getGreenhouse();
            // Print splashscreen
            System.out.println("Greenhouse: " + greenhouse.getName());
        } catch (GreenhouseNotInitializedException ex) {
            throw new RuntimeException("FATAL ERROR. Setup sequence failed to initialize greenhouse");
        }
    }
}
