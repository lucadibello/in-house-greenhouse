package com.inhousegreenhouse.ch.app.main;

import com.inhousegreenhouse.ch.app.core.sequence.SetupSequence;
import com.inhousegreenhouse.ch.app.core.sequence.SplashScreenSequence;
import com.inhousegreenhouse.ch.app.core.sequence.StartupSequence;
import com.inhousegreenhouse.ch.backend.exception.CriticalGreenhouseError;
import com.inhousegreenhouse.ch.app.core.graphic.SplashScreen;
import com.inhousegreenhouse.ch.app.core.sequence.IGreenhouseSequence;

import java.util.ArrayList;
import java.util.List;

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

        // Add sequences to the list
        greenhouseManager.addSequence(new SplashScreenSequence());
        greenhouseManager.addSequence(new SetupSequence());
        greenhouseManager.addSequence(new StartupSequence());

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
