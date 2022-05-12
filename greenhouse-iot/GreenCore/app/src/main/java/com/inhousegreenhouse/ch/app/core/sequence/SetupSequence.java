package com.inhousegreenhouse.ch.app.core.sequence;

import com.inhousegreenhouse.ch.backend.controller.GreenhouseController;
import com.inhousegreenhouse.ch.backend.exception.CriticalGreenhouseError;
import com.inhousegreenhouse.ch.backend.helper.SetupHelper;
import com.inhousegreenhouse.ch.backend.model.util.GreenhouseSetup;
import com.inhousegreenhouse.ch.backend.helper.SetupHelper;

import java.util.Properties;

/**
 * This class is used to setup the greenhouse.
 */
public class SetupSequence extends Sequence implements IGreenhouseSequence{

    /**
     * Greenhouse controller, needed to talk with the backend.
     */
    private final GreenhouseController greenhouseController;

    /**
     * Constructor.
     */
    public SetupSequence(Properties settings) {
        super("SET_UP_SEQUENCE");
        greenhouseController = new GreenhouseController(settings);
    }

    /**
     * This method is used to setup the greenhouse.
     * @throws CriticalGreenhouseError if the setup fails.
     */
    public void run() throws CriticalGreenhouseError {
        System.out.println("\n-- S E T U P\tS E Q U E N C E --");

        // TODO: All'avvio la serra, se configurata, deve controllare se l'UUID e' gia' presente nel database.

        System.out.println("\n[STEP 1: Checking if this greenhouse is already set up ...]");

        // Check if the greenhouse has been set up
        if (!greenhouseController.isSetup()) {
            System.out.println("[*] This greenhouse has not been set up yet");
            // Load the greenhouse values
            System.out.println("\n[STEP 2: Starting socket to let a client to setup this greenhouse ...]");
            System.out.println("[*] Starting setup socket...");

            // Wait for the user to send data to the greenhouse setup socket
            SetupHelper helper = new SetupHelper();
            GreenhouseSetup setup = helper.waitServerData(4686);

            // Register the greenhouse in the database
            System.out.println("\n[STEP 3: Registering this greenhouse in the database ...]");
            if (greenhouseController.registerGreenhouse(setup)) {
                System.out.println("[!] Greenhouse successfully saved inside persistence file.");
            } else {
                throw new CriticalGreenhouseError("Error while executing STEP 3. Please, check the output to fix the problem");
            }
        } else {
            System.out.println("[!] Greenhouse already setup, skipping setup sequence...");
        }
    }
}
