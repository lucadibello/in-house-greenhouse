package com.inhousegreenhouse.ch.app.main;

import com.inhousegreenhouse.ch.app.core.sequence.SetupSequence;
import com.inhousegreenhouse.ch.app.core.sequence.SplashScreenSequence;
import com.inhousegreenhouse.ch.app.core.sequence.StartupSequence;
import com.inhousegreenhouse.ch.backend.exception.CriticalGreenhouseError;
import com.inhousegreenhouse.ch.app.core.graphic.SplashScreen;
import com.inhousegreenhouse.ch.app.core.sequence.IGreenhouseSequence;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

/**
 * Entry point for the In-House Greenhouse monitoring system.
 */
public class GreenhouseManager {

    /**
     * List of all the sequences of the greenhouse life cycle.
     */
    private final List<IGreenhouseSequence> sequences;

    /**
     * Constructor.
     */
    public GreenhouseManager() {
        sequences = new ArrayList<>();
    }

    /**
     * Counter that describes the current step of the greenhouse life cycle.
     */
    private int currentSequence = 0;

    /**
     * Constructor.
     * @param args Arguments of the program.
     */
    public static void main(String[] args) {
        // Create new instance of GreenhouseManager
        GreenhouseManager greenhouseManager = new GreenhouseManager();

        // Try to load the properties file
        Properties prop = new Properties();
        try {
            // Load properties and build the base URL.

            //load a properties file from class path, inside static method
            prop.load(GreenhouseManager.class.getClassLoader().getResourceAsStream("greencore.properties"));

            // Check if the properties have been set
            if (prop.getProperty("greencore.proxy.host") == null) {
                // Throw exception to exit the program
                throw new CriticalGreenhouseError("No proxy host set in the properties file.");
            } else if (prop.getProperty("greencore.proxy.port") == null) {
                // Throw exception to exit the program
                throw new CriticalGreenhouseError("No proxy port set in the properties file.");
            } else if (prop.getProperty("greencore.proxy.route") == null) {
                // Throw exception to exit the program
                throw new CriticalGreenhouseError("No proxy route set in the properties file.");
            } else if (prop.getProperty("greencore.watering.wateringTimeMillisecond") == null) {
                // Throw exception to exit the program
                throw new CriticalGreenhouseError("No watering time set in the properties file.");
            } else if (prop.getProperty("greencore.watering.minHumidityBeforeWatering") == null) {
                // Throw exception to exit the program
                throw new CriticalGreenhouseError("No minimum humidity before watering set in the properties file.");
            }
        } catch (Exception e) {
            // If an error occurs, print the error message and exit the program
            SplashScreen.printCriticalError(new CriticalGreenhouseError("Error while loading properties file: " + e.getMessage()));

            // Exit program
            System.exit(1);
        }

        // Continue the life cycle
        greenhouseManager.addSequence(new SplashScreenSequence());
        greenhouseManager.addSequence(new SetupSequence(prop));
        greenhouseManager.addSequence(new StartupSequence(prop));

        // Start the sequences
        greenhouseManager.startSequences();
    }

    /**
     * Add a sequence to the list of sequences.
     * @param sequence Sequence to add.
     */
    public void addSequence (IGreenhouseSequence sequence) {
        sequences.add(sequence);
    }

    /**
     * Start all the sequences.
     */
    public void startSequences () {
        try {
            for (; currentSequence < sequences.size(); currentSequence++) {
                // Start the sequence
                sequences.get(currentSequence).run();
            }
        } catch (CriticalGreenhouseError e) {
            // If a critical error occurs, print the error message and exit the program
            SplashScreen.printCriticalError(e);
            // Re-execute failed sequence
            startSequences();
        }
    }
}
