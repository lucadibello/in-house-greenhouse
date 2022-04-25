package core.sequence;

import core.graphic.SplashScreen;

public class SplashScreenSequence extends Sequence implements IGreenhouseSequence {

    public SplashScreenSequence() {
        super("SPLASH_SCREEN_SEQUENCE");
    }

    @Override
    public void run() {
        // Print splash screen
        SplashScreen.printStartupScreen();
    }
}
