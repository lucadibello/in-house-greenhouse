package main;

import backend.exception.CriticalGreenhouseError;
import core.graphic.SplashScreen;
import core.sequence.IGreenhouseSequence;
import core.sequence.SetupSequence;
import core.sequence.SplashScreenSequence;
import core.sequence.StartupSequence;

import java.util.ArrayList;
import java.util.List;

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
            for (IGreenhouseSequence sequence : sequences) {
                // Start the sequence
                sequence.run();
            }
        } catch (CriticalGreenhouseError e) {
            // If a critical error occurs, print the error message and exit the program
            SplashScreen.printCriticalError(e);
        }
    }
}
