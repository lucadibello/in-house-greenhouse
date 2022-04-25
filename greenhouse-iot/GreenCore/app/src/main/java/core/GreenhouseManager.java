package core;

import backend.controller.SensorController;
import backend.model.sensor.HumiditySensor;

public class GreenhouseManager {
    public static void main(String[] args) {
        // Create sensor controller
        SensorController sensorController = new SensorController();

        // Print all available sensorss
        System.out.println("Available sensors:");
        for (HumiditySensor w : sensorController.getHumiditySensors()) {
            System.out.println("\t" + w);
        }

        System.out.println("My application is running!");
    }
}
