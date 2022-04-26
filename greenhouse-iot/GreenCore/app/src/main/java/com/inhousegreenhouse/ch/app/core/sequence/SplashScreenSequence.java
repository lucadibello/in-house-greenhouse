package com.inhousegreenhouse.ch.app.core.sequence;

import com.inhousegreenhouse.ch.app.core.graphic.SplashScreen;

/**
 * The splash screen sequence.
 */
public class SplashScreenSequence extends Sequence implements IGreenhouseSequence {

    /**
     * The splash screen sequence.
     */
    public SplashScreenSequence() {
        super("SPLASH_SCREEN_SEQUENCE");
    }

    /**
     * The splash actual screen sequence.
     */
    @Override
    public void run() {
        // Print splash screen
        SplashScreen.printStartupScreen();
    }
}
