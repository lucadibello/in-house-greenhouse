package com.inhousegreenhouse.ch.app.core.graphic;

/**
 * This class is used to display the splash screen.
 */
public class SplashScreen {

    /**
     * This method is used to display the splash screen.
     */
    public static void printStartupScreen() {
        System.out.println("        ____            __  __                         ______                     __                        ");
        System.out.println("       /  _/___        / / / /___  __  __________     / ____/_______  ___  ____  / /_  ____  __  __________ ");
        System.out.println("       / // __ \\______/ /_/ / __ \\/ / / / ___/ _ \\   / / __/ ___/ _ \\/ _ \\/ __ \\/ __ \\/ __ \\/ / / / ___/ _ \\");
        System.out.println("     _/ // / / /_____/ __  / /_/ / /_/ (__  )  __/  / /_/ / /  /  __/  __/ / / / / / / /_/ / /_/ (__  )  __/");
        System.out.println("    /___/_/ /_/     /_/ /_/\\____/\\__,_/____/\\___/   \\____/_/   \\___/\\___/_/ /_/_/ /_/\\____/\\__,_/____/\\___/ ");
        System.out.println();
        System.out.println("    -- A new generation of smart indoor greenhouses --");
        System.out.println();
        System.out.println("    -- Authors:");
        System.out.println("    -- \t Luca Di Bello <info@lucadibello.ch>");
        System.out.println("    -- \t Daniel Ibrahim <daniel.ibrahim@student.supsi.ch>");
    }

    /**
     * This method is used to display the splash screen.
     * @param ex the exception that occurred
     */
    public static void printCriticalError (Exception ex) {
        System.out.println("     _.-^^---....,,--       ");
        System.out.println(" _--                  --_  ");
        System.out.println("<          BOOM.         >)");
        System.out.println("|     CRITICAL ERROR      |");
        System.out.println(" \\._                   _./ ");
        System.out.println("    ```--. . , ; .--'''    ");
        System.out.println("          | |   |          ");
        System.out.println("       .-=||  | |=-.       ");
        System.out.println("       `-=#$%&%$#=-'       ");
        System.out.println("          | ;  :|          ");
        System.out.println("  _____.,-#%&$@%#&#~,._____");
        System.out.println("-- CRITICAL INTERNAL ERROR --");
        System.out.println("- Error: " + ex.getMessage());
    }
}
